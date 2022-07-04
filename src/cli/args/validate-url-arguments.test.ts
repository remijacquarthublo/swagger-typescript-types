import chalk from 'chalk';

import { runCommand } from '../../tests-related/run-command';

describe('validateUrlArguments function', () => {
  const validateArgumentsPath = './../cli/args/validate-url-arguments';
  const url = 'https://cool.org';
  const outputPath = './src/api';
  global.console = { error: jest.fn() } as unknown as Console;
  const mockExit = jest
    .spyOn(process, 'exit')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .mockImplementation((() => {}) as (code?: number | undefined) => never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display an error when no -u option was given', async () => {
    runCommand(validateArgumentsPath, '-o', outputPath);

    expect(mockExit).toHaveBeenCalled();

    expect(console.error).toHaveBeenCalledWith('Missing required argument: u');
  });

  it('should display an error when no -o option was given', async () => {
    runCommand(validateArgumentsPath, '-u', url);

    expect(mockExit).toHaveBeenCalled();

    expect(console.error).toHaveBeenCalledWith('Missing required argument: o');
  });

  it('should display an error when -u option value is not an url', async () => {
    runCommand(validateArgumentsPath, '-u', 'yolo', '-o', outputPath);

    expect(mockExit).toHaveBeenCalled();

    expect(console.error).toHaveBeenCalledWith(
      chalk.bold.redBright('Errors:\n-u\t\tExpecting an url\n'),
    );
  });

  it('should return args', async () => {
    const args = runCommand(validateArgumentsPath, '-u', url, '-o', outputPath);

    expect(args).toStrictEqual({
      swaggerJsonUrl: url,
      outputPath,
    });
  });
});
