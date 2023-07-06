import  { SFN as StepFunctions,StartExecutionCommandInput } from '@aws-sdk/client-sfn';

export async function callStepFunction(): Promise<number | undefined> {
  const stateMachineArn = 'test stateMachineArn'
  const params: StartExecutionCommandInput = {
    stateMachineArn:'test stateMachineArn',
    input: 'test input',
  };

  try {
    const stepFunction = new StepFunctions({});
    const response = await stepFunction.startExecution(params);
    console.info(
      `Step function invoked: arn = ${stateMachineArn}, params = ${
        params.input
      }, response = ${JSON.stringify(response)}`
    );

    return response.$metadata.httpStatusCode;
  } catch (error) {
    console.error(`Failed to invoke step function with params: ${params.input}, Error: `, error);
    return;
  }
}
callStepFunction()