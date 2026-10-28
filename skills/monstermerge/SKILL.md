---
name: monstermerge
description: Merge all open pull requests, test the work locally, then deploy to production, monitor production, fix or revert production if needed
---

# Monstermerge

Your goal is to merge all open pull requests into the primary branch, test the work locally, then deploy it to production safely, and monitor production for any issues, fixing or reverting changes if needed.

## Step 1: inventory pull requests

Look at the open pull requests and determine what is the best protocol to merge them. Your goal is to make sure the intentions of the pull requests are maintained and to minimise collisions.

Make sure you think about footguns and side effects. Gracefully handle code behaviours, version changes, documentation, notes, and so forth.

## Step 2: merge the work locally

Based on your inventory, gracefully and safely merge the pull requests locally. Handle collisions to the best of your ability. If you see new issues introduced by the merging of the PRs, fix those issues.

## Step 3: test locally

Test the locally merged work with the relevant test suites, but also spend some time running behavioural tests to simulate real user usage as it would occur on the production server. That means you are cleared to spend on real infrastructure.

## Step 4: deploy to production

Merge the work into the primary branch the deploy the work to production autonomously. Do so safely and with minimal downtime. If you have to cause minor downtime, or interrupt user work, make a tradeoff analysis for when that makes sense. If cancelling and restarting user work is a feasible path, you are allowed to do so. So long as you do not cause users to lose money, you may decide autonomously. If you cancel user work, make sure you refund them.

## Step 5: monitor production

For at least one hour, monitor production for errors. If you encounter errors fix them. If fixing them is not feasible, revert your work.

During this monitoring phase you are expected to trigger some user-like work on production to make sure that the production deployment is behaving as expected. Do so for both pre existing features and newly added features.

====

Affordances:
- You may spend up to $200 in infrastructure spend if needed
- You may use local resources for testing, including docker containers (if you have docker sock access)

Boundaries:
- You may not take destructive actions without a backup mechanism that can undo your changes