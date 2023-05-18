import fs from 'fs/promises'
import dotenv from 'dotenv'
import inq from 'inquirer'
import path from 'path'
import chalk from 'chalk'
const prompt = inq.createPromptModule()

async function genEnv() {
  let { type } = await prompt({
    type: 'list',
    name: 'type',
    default: 'dev',
    choices: ['development', 'production', 'development production']
  })
  type = type === 'development production' ? 'proddev' : type

  const example = dotenv.parse(
    await fs.readFile(path.resolve(process.cwd(), '.env.example')),
    { encoding: 'utf-8' }
  )
  const resultArr = []
  for (const key in example) {
    const result = await prompt({
      type: 'input',
      name: key,
      default: example[key]
    })
    resultArr.push(`${key}=${result[key]}`)
  }

  await fs.cp(
    path.resolve(process.cwd(), `./.env.example`),
    path.resolve(process.cwd(), `./.env.${type}.local`)
  )
  await fs.writeFile(
    path.resolve(process.cwd(), `./.env.${type}.local`),
    resultArr.join('\n')
  )
}

async function main() {
  const res = await prompt({
    type: 'list',
    name: 'need generate',
    default: 'env',
    choices: ['env']
  })

  switch (res['need generate']) {
    case 'env':
      await genEnv()
      break
  }

  console.log(chalk.green('Done!'))
}
main()
