import { exec } from 'child_process';

export default (req, res) => {
  exec('npm run wti-pull', (error, stdout, stderr) => {
    res.status(200).send({
      error,
      stdout,
      stderr,
    });
  });
};
