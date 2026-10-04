---
name: shapeshift
description: Select model and reasoning effort for planning, implementation, and delegation; reassess when complexity changes or progress stalls.
---

# Shapeshift

You will review your current task and plans, and select the right model and effort level for your main thread and sub agents. Your goal is to choose the right model and effort level for the task you are about to do. The best model/effort combo is the one that can fulfil the task with the lowest expected total cost.

Depending on when this skill is called, you have slightly different jobs.

## Your workflow

Determine which of the options below is relevant to your current situation. It's important that you evaluate both your main thread, if you are going to use sub agents, to evaluate those one by one as well.

Boundaries:

- The actual consideration of what model and effort to use must happen from Astra or Fable at medium effort, so run `babysit model` **before** considering the task at hand
- Your decision should keep in mind that model availability is limited by usage limits, so run `babysit usage` to check the current limits before finalizing your choice

### Option 1: you are making a plan

Consider the complexity of the task you are planning for. Choose the best model/effort level. In a planning phase you may err upwards. If you set a high model/effort, make sure to rerun `shapeshift` after planning is done.

### Option 2: you are going to execute a task

Evaluate the complexity of the task you are about to do. Based on that, select the appropriate model/effort.

### Option 3: you are in the middle of an implementation

Evaluate whether the model and effort you are operating at is still appropriate. A model or effort that is set too high will incur cost, which you should avoid. Conversely, if you are noticing the task is more complex than you thought, or you appear to be getting stuck, increase the model/effort accordingly.

## How to set model and effort level

If available, use the `babysit` cli:

- `babysit model` to list options
- `babysit model <model_name>` to set the model
- `babysit effort <effort_level>` to set the effort level

For subagents you have direct control over their model and effort level, so you can set them individually as needed.

==============================

## What model to choose when

Run `babysit model` to see the up to date intelligence vs cost levels of the available models. Use that information to select the model for the task.

You may use `--sort` to make more detailed comparisons of the models if needed.

**Boundaries:**

- Your primary consideration is selecting the right intelligence level for a task
- Optimising cost is good, but not at the cost of task performance
  - Cost optimisation is more important when models are expensive
  - Super cheap models like Luna may only be used at max effort (as it costs only marginally more)
- Upgrading Astra/Fable above medium requires exceptional difficulty or justification

Note on context efficiency: give workers focussed context, acceptance criteria, and boundaries.
