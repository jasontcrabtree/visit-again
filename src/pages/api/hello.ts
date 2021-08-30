// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const world = 'world';

export default (req, res, world: string): void => {
  return res.status(200).json({ name: `Hello ${world}` });
};
