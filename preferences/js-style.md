# Javascript code style preferences

Write code that breathes. Think Ruby-like elegance meets modern js.

## Logging preferences

Instead of `console.*` use the `log` utility from the `mentie` package. Use:

- `log.error()` for errors: issues that break functionality
- `log.warn()` for warnings: issues that do not break functionality but are concerning or non-ideal
- `log.info()` for general info: important runtime events or milestones
- `log.debug()` for verbose debugging info: detailed internal state useful for debugging but too noisy for regular use
- `log.insane()` for extremely verbose info: things like detailed objects that report state

## Mentie helpers

Run `node -e "console.log(Object.keys(require('mentie')))"` to see all available helpers in the `mentie` package. Use them to keep your code elegant and concise. For example, use `abort_controller` for fetch timeouts, `cache` for memoization, etc.

## Syntax preferences

Code should be elegant, not use superfluous characters, and have space to breathe. For example: do not use semicolons, add space in brackets. The linter will show you syntax preferences, to that end with every change learn the styling by:

1. save your changes and look at the syntax
2. run `npm run lint` in the directory with `package.json` and ignore the command output
3. look at how the linter changed the style, and mimic it in future responses.

## Always use template literals instead of strings
```js
// Use literals for regular strings
const name = `Ada Localace`

// Use templates for string manipulation too
const annotated_name = `${ name } ${ Math.random() }`
```

## Use destructuring
```js
const { length: user_count } = [ { metadata: { age: 33 } } ]
const [ , username ] = email_string.match( /(.*)@/ )
const double_user_age = ( { metadata: { age } } ) => age * 2
```

## snake_case for Everything
```js
const timeout_ms = 5_000
const user_name = 'John'
const fetch_user_data = async ( user_id ) => { }
```

## Use comments to describe intent
```js
import { abort_controller } from 'mentie'

// Load the users with a timeout to prevent hanging
const fetch_options = abort_controller( { timeout_ms: 10_000 } )
const { uids } = await fetch( 'https://...', fetch_options ).then( res => res.json() )

// Parallel fetch resulting data to optimise speed
const downstream_data = await Promise.all( uids.map( async uid => fetch( `https://...?uid=${ uid }` ) ) )
```

## Prioritise semantic clarity over optimisation
Don't reassign variables if the purpose of the variable changes. Create new bindings for each transformation step.
```js
// Parse a dataset - each step is clear and traceable
const data = []
const filtered_data = data.filter( ( { relevant_number } ) => relevant_number > 1.5 )
const restructured_data = filtered_data.map( ( { base_value, second_value } ) => ( { composite_value: base_value * second_value } ) )
return restructured_data
```

## Lean towards onelining single statements
Single statements can be on one line. Multiple statements need blocks.
```js
// ✅ Single statement - oneline it
if( condition ) log.info( `Message` )
const filtered_data = data.filter( ( { relevant_property } ) => relevant_property )
```

## Functional Programming Over Loops

Prefer `.map()`, `.filter()`, `.reduce()`, `.find()`, `.some()`, `.every()` over `for`/`while` loops.

```js
const active_users = users.filter( u => u.active )
const user_names = active_users.map( u => u.name )
const total_age = user_names.reduce( ( sum, age ) => sum + age, 0 )
```

## JSDoc for Exported Functions

**CRITICAL**: Every exported function MUST have JSDoc. Verify before finishing!

```js
/**
 * Fetches user data from the API
 * @param {string} user_id - The ID of the user to fetch
 * @returns {Promise<Object>} User data object
 */
export const fetch_user = async ( user_id ) => {
    const { data } = await api.get( `/users/${ user_id }` )
    return data
}
```

## Error Handling

Only at boundaries (user input, external APIs). Trust internal code. Remember `finally` for cleanup!

```js
const fetch_user = async ( id ) => {

    try {
        start_loading()
        const response = await api.get( `/users/${ id }` )
        return response.data
    } catch( error ) {
        throw new Error( `Failed to fetch user: ${ error.message }` )
    } finally {
        stop_loading()
    }
}
```

## Complete example of well styled code

```js
/**
 * Fetches and processes active users from the API
 * @param {Object} options
 * @param {Array} options.user_ids - User ids to fetch
 * @param {Number} options.limit - Limit the amount of users to fetch
 * @returns {Promise<Array>} Processed user objects
 */
export async function fetch_and_process_users( { user_ids, limit=5 } = {} )  {

    // Get users to ensure up to date data
    const users = await api.get( `/users`, { user_ids, limit } )

    // Keep only active users to prevent wasting time on inactive ones
    const filtered_users = users.filter( ( { active } ) => active )

    // Annotate users with value based on local conversion so we can show the user the computed values
    const annotated_users = filtered_users.map( ( { score, user } ) => ( { score: score * local_conversion_value, ...user } ) )

    // Return users with annotated data
    return annotated_users
}

```


## React Specific styling

**Exception to snake_case**: React component names MUST be PascalCase (required by React/JSX).

```js
// ✅ Components are PascalCase
const UserProfile = ( { user_id } ) => { }
const DataTable = () => { }

// ✅ Everything else is snake_case
const user_name = `John`
const fetch_user_data = async ( user_id ) => { }
```

**File naming**: Component files use PascalCase to match component name.
- `UserProfile.jsx` - Component files
- `fetch_user_data.js` - Utility files

**Event handlers**:
- Do not name things after the event (e.g. `on_click`) but name them actions (e.g. `save_user`)

**JSX spacing and structure**:
```js
// Styled and stateless sections use arrow functions or variables
const Header = styled.aside`
    color: red;
`

// Use JSX comments to separate sections
export function UserProfile( { user_id, on_update } ) {

    // Hooks at the top
    const [ user_data, set_user_data ] = useState( null )
    const [ is_loading, set_is_loading ] = useState( false )

    // Effects after hooks
    useEffect( () => {
        fetch_user_data( user_id ).then( set_user_data )
    }, [ user_id ] )

    // Event handlers
    const update_user = () => on_update( user_data )

    // Conditional rendering
    if( is_loading ) return <LoadingSpinner />

    // Do not add () around returned jsx.
    return <>

            { /* Profile header section */ }
            <Header title={ user_data.name } />

            { /* Profile details */ }
            <div className="profile">
                { user_data.details }
            </div>

            { /* Actions */ }
            <Button on_click={ update_user }>Save</Button>

        </>
}

// Lists need keys
const user_list = users.map( ( user ) => <UserCard key={ user.id } user={ user } /> )

// Props always have spacing
<Component prop={ value } />
<div className="foo">{ children }</div>
```