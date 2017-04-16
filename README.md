## Welcome to the Alexa Times Table Skill

Amazon have some crazy rules about publishing skills to their store.  One of them is that they don't allow any skill that they think is targeted at children under the age of 13.  Clearly a times table game is going to be used by children under the age of 13 that want help to learn their times tables.  

This means that to get the Times Tables Skill on your Alexa device you'll have to setup your own free developer account and upload the code from this project.

To use the skill on your device say "Alexa, open Times Tables".  Alexa will then ask you 5 questions from the 0 to 12 times tables, after each answer Alexa will tell you if you were correct before asking the next question.  After you have given five answers, Alexa will give you your score and end the game.

### Step 1: Create your free Amazon Developer Account and name your skill

Start by clicking [here](https://developer.amazon.com/login.html) to sign in or create a free Amazon account.  Sign in using an account that you use on your Alexa device.

![](https://images-na.ssl-images-amazon.com/images/G/01/mobile-apps/dex/alexa/new-skill-step-01-sh-03.jpg)

Once you’re logged in:

1. Click here to enter the Alexa section of the Amazon developer console.
1. Click the "Get Started >" button under Alexa Skills Kit.
1. Click "Add a New Skill" in the upper right

Give your skill a name and invocation name “Times Tables.” Users will say, “Alexa, launch Times Tables” to interact with the skill. Make sure tou change the Language to English (U.K.).

![](https://drive.google.com/uc?id=0B3kYudVH7iLbVmMxUndlZ3VTc2s)

### Step 2: Iteraction Model

Intents are actions that respond to a user's spoken request.  Copy and paste the Times Tables intents below into the Intent Schema.

`
{
  "intents": [
    {
      "slots": [
        {
          "name": "number",
          "type": "AMAZON.NUMBER"
        }
      ],
      "intent": "AnswerIntent"
    },
    {
      "intent": "AMAZON.HelpIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    },
    {
      "intent": "AMAZON.CancelIntent"
    }
  ]
}
`

Utterances are a list of possible things that a user might say when interacting with your skill. Since we're only expecting the user to tell us numbers, we don't need anything here.

### Step 3: Upload code into AWS Lambda

With AWS Lambda, you upload code, and it runs with zero administration on your part. It has its own console, so:

1. Open a new tab (without closing your other developer console), then open (or create) your free developer account at [aws.amazon.com](https://console.aws.amazon.com/console/home). This is your Amazon Web Services (AWS) Management console.

![](https://m.media-amazon.com/images/G/01/moile-apps/dex/alexa/new-skill-step-02-sh-02-jan-31-2017.png)

2. From Services, select Lambda to sign into your console. Click here to visit the Lambda section of AWS.

![](https://m.media-amazon.com/images/G/01/moile-apps/dex/alexa/new-skill-step-02-sh-021-v2-jan-31-2017.png)

3. Select “Create a Lambda function”
4. At the bottom of the “Select Blueprint” page, select “Skip.” If there is no option to skip, use the sidebar menu items to select “Configure function”
5. Configure triggers, Click in the box and select Alexa Skills Kit, then “Next”

![](https://images-na.ssl-images-amazon.com/images/G/01/mobile-apps/dex/alexa/new-skill-step-03-sh-003.jpg)

6. Under “Configure Function,” enter the name and description for your skill

![](https://drive.google.com/uc?id=0B3kYudVH7iLbZjlFdE1UTkp0V2s)

7. Download the release [TimeTableSkill.zip](https://github.com/ichivers/TimesTableSkill/releases/download/1.0.0.0/TimesTableSkill.zip) that you will need in the next step

8. Under “Code Entry Type” select “Upload a .Zip File” and upload this zip file we generated above.

![](https://drive.google.com/uc?id=0B3kYudVH7iLbZkRsQjdGNWg5SFU)

9. Select “index.handler” from the Handler dropdown
10. Drop down the “Role” menu to create or select an existing role

![](https://images-na.ssl-images-amazon.com/images/G/01/mobile-apps/dex/alexa/new-skill-step-02-sh-07.jpg)

**Select “Create a custom role” to open a new tab in the IAM Management Console, then:**

11. Accept the defaults to create a new IAM Role called “lambda_basic_execution”
12. Select “Allow” in the lower right corner and you will be returned to your Lambda function
13. Keep the default Advanced settings. Select “Next” and review

![](https://m.media-amazon.com/images/G/01/moile-apps/dex/alexa/new-skill-step-02-sh-08-jan-31-2017.png)

Select “Create Function.” You should get a confirmation: “Congratulations! Your Lambda function "Times Tables" has been successfully created.”

14. Add an Alexa Trigger to your Lambda Function

![](https://drive.google.com/uc?id=0B3kYudVH7iLbdGp5MW1TREZQaGs)

15. From the upper right-hand corner, copy the ARN number (The ARN starts with “arn:aws:lambda:us-east-“ and ends with your function name.)

### Step 4: Configure and test your code

**Got your ARN? Now go back to your other open tab:**

1. Return to your developer console, where you should still be in the Configuration tab

![](https://m.media-amazon.com/images/G/01/moile-apps/dex/alexa/amazon-alexa-skill-step-4-001-v2-jan-31-2017.png)

2. For Endpoint, select the “Lambda ARN (Amazon Resource Name)” radio button, then paste in the ARN
3. Select “No” for Account Linking
4. Select "Next"

**You have now completed the initial development of your skill.**

### Test Your Skill

![](https://images-na.ssl-images-amazon.com/images/G/01/mobile-apps/dex/alexa/new-skill-step-03-sh-03.jpg)

1. In the Service Simulator, type “open Times Tables” (or your custom name) and select “Ask Times Tables”

![](https://drive.google.com/uc?id=0B3kYudVH7iLbd0Y0cHY0bk0zTzA)

You should see the formatted JSON request from the Alexa Service and the response coming back. Verify that you get a correct Lambda response, and notice the card output. 

You can also test with your device. Assuming your Echo device is online (and logged in with the same account as your developer account), you should now see your skill enabled in the Alexa app.
