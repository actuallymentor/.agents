import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, mkdir, readFile, readlink, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { runInNewContext } from 'node:vm'

const exec_file = promisify( execFile )
const repo_dir = resolve( dirname( fileURLToPath( import.meta.url ) ), `..` )
const setup_script = join( repo_dir, `symlink.sh` )

// Use actual files and commands in disposable directories, never the user's home.
const setup_fixture = async context => {
    const fixture_dir = await mkdtemp( join( tmpdir(), `agent-workflows-` ) )
    context.after( () => rm( fixture_dir, { recursive: true, force: true } ) )

    const agent_dir = join( fixture_dir, `agent sources` )
    const claude_dir = join( fixture_dir, `claude settings` )
    await mkdir( join( agent_dir, `skills` ), { recursive: true } )
    await writeFile( join( agent_dir, `AGENTS.md` ), `Fixture instructions\n` )

    return { fixture_dir, agent_dir, claude_dir }
}

test( `setup creates correct links and is safe to rerun`, async context => {
    const { agent_dir, claude_dir } = await setup_fixture( context )

    for( let run = 0; run < 2; run++ ) {
        await exec_file( `bash`, [ setup_script, agent_dir, claude_dir ] )
        assert.equal( await readlink( join( claude_dir, `CLAUDE.md` ) ), join( agent_dir, `AGENTS.md` ) )
        assert.equal( await readlink( join( claude_dir, `skills` ) ), join( agent_dir, `skills` ) )
    }
} )

for( const conflict_kind of [ `file`, `directory`, `broken link`, `other directory link` ] ) {
    test( `setup preserves a conflicting ${ conflict_kind } without partial installation`, async context => {
        const { fixture_dir, agent_dir, claude_dir } = await setup_fixture( context )
        await mkdir( claude_dir )
        const conflict_path = join( claude_dir, `skills` )

        if( conflict_kind === `file` ) await writeFile( conflict_path, `User content\n` )
        if( conflict_kind === `directory` ) await mkdir( conflict_path )
        if( conflict_kind === `broken link` ) await symlink( join( fixture_dir, `missing` ), conflict_path )
        if( conflict_kind === `other directory link` ) await symlink( fixture_dir, conflict_path )

        await assert.rejects( exec_file( `bash`, [ setup_script, agent_dir, claude_dir ] ), { code: 1 } )
        await assert.rejects( readlink( join( claude_dir, `CLAUDE.md` ) ), { code: `ENOENT` } )

        if( conflict_kind === `file` ) assert.equal( await readFile( conflict_path, `utf8` ), `User content\n` )
        if( conflict_kind === `broken link` ) assert.equal( await readlink( conflict_path ), join( fixture_dir, `missing` ) )
        if( conflict_kind === `other directory link` ) assert.equal( await readlink( conflict_path ), fixture_dir )
    } )
}

test( `setup rejects missing sources before creating destinations`, async context => {
    const { fixture_dir, claude_dir } = await setup_fixture( context )
    await assert.rejects( exec_file( `bash`, [ setup_script, join( fixture_dir, `missing` ), claude_dir ] ), { code: 1 } )
    await assert.rejects( readFile( join( claude_dir, `CLAUDE.md` ) ), { code: `ENOENT` } )
} )

test( `gitignore discovers maintained additions and excludes private/generated files`, async context => {
    const { fixture_dir } = await setup_fixture( context )
    await writeFile( join( fixture_dir, `.gitignore` ), await readFile( join( repo_dir, `.gitignore` ) ) )
    await exec_file( `git`, [ `init`, `--quiet`, fixture_dir ] )

    for( const path of [ `skills/new-skill/SKILL.md`, `skills/new-skill/scripts/run.sh`, `preferences/new.md`, `tests/new.test.mjs`, `README.md`, `CHANGELOG.md` ] ) {
        await assert.rejects( exec_file( `git`, [ `check-ignore`, path ], { cwd: fixture_dir } ), { code: 1 } )
    }
    for( const path of [ `.notes/MEMORY.md`, `.babysitrc`, `auth.json`, `babysit.yaml`, `skills/new-skill/.env`, `skills/new-skill/node_modules/pkg/index.js` ] ) {
        const { stdout } = await exec_file( `git`, [ `check-ignore`, path ], { cwd: fixture_dir } )
        assert.equal( stdout.trim(), path )
    }
} )

test( `the age aggregation example sums ages of active users`, async () => {
    const preferences = await readFile( join( repo_dir, `preferences/js-style.md` ), `utf8` )
    const [ , example ] = preferences.match( /## Functional Programming Over Loops[\s\S]*?```js\n([\s\S]*?)\n```/ )
    const users = [ { name: `Ada`, age: 36, active: true }, { name: `Lin`, age: 30, active: true }, { name: `Sam`, age: 50, active: false } ]
    assert.equal( runInNewContext( example + `\ntotal_age`, { users } ), 66 )
    assert.equal( runInNewContext( example + `\ntotal_age`, { users: [] } ), 0 )
} )
