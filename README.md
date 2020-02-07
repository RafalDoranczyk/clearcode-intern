# Clearcode - recruiment task

My solution of two internship tasks.

## How to run the project

Both tasks are written in JavaScript for running in Node.js mainly, so make sure you have Node.js installed. Open the terminal and simply run <node taskName>.
You should see the solution in the console.

### Task 1 solution

First of all, I create while loop for each element(string) in given array.
Inside loop, I check if there is any bracket in string. If there is, I can replace brackets with empty string and increment power. If there is no match that means string is not empty so group is not formed properly so power is 0.
Finally, I return max value index if there is only one max value in array otherwise undefined.

### Task 2 solution

Inside enrichVisitorsData function I create try/catch blocks. Inside try block I iterate over all objects in visitors array to create a new one that is completed (if there is a need) with missing properties. I wait for all promises to be fulfilled.

- If there is no countryCode in visitor object, I check if there is ipAddress. If there is, I use httpGet function with properly url and add countryCode in current visitor object. If there is no ipAddress but firstName is present, I can send another request and add countryCode if possibility is over 0.75.
- If object has firstName property and gender is not present I make another http request and add gender property if possibility is over 0.75.

If there is any issue with http request, it is catched and returned.
If there is no issue I simply show result in the console and return it.
