# AI Usage Notes

I used ChatGPT during development whenever I got stuck or wanted to double-check my approach. It mostly helped me understand a few Express.js concepts, discuss validation logic, and suggest cleaner ways to structure parts of the code. I used it as a learning and debugging tool rather than relying on it for every step.

## What was AI-generated vs. what I wrote/reviewed myself

ChatGPT assisted with parts of the implementation, including discussing the Express application structure, validation logic, controller flow, and suggesting improvements to code readability. I completed the integration, reviewed every file, verified the request flow, and ensured the final implementation matched the assignment requirements before submitting.

In particular:

- **`src/utils/validateExpense.js`** – I checked that it correctly validates required fields, rejects non-positive amounts, and accepts only valid date formats.
- **`src/controllers/expenseController.js`** – I verified the request flow from validation to storing data and made sure deleting an expense with an invalid ID returns a `404` response.
- **`src/models/expenseStore.js`** – I kept the implementation simple by using an in-memory array since persistent storage wasn't required for this assignment.
- **`tests/expenses.test.js`** – I reviewed the test cases to make sure they covered both successful requests and common validation/error scenarios.

## What I validated and tested

Before submitting, I checked that:
- Expenses are added successfully with valid input.
- Invalid requests return proper validation errors.
- All expenses are listed correctly.
- Filtering by category works as expected.
- Overall and category-wise expense totals are calculated correctly.
- Deleting an expense works, and trying to delete a non-existing expense returns the expected response.

I also checked that the API routes matched the README and that the project structure stayed simple and easy to follow.

## AI suggestions I did not use

I kept the project focused on the assignment requirements instead of adding extra features. For example:
- I used an in-memory store instead of a database since that was enough for this project.
- I didn't add authentication or any unnecessary dependencies.
- I avoided overcomplicating the project with extra abstractions that weren't really needed.

Overall, ChatGPT was helpful whenever I needed guidance or a second opinion, but I still reviewed the final code myself, understood how each part worked, and made the final implementation decisions before submitting.
