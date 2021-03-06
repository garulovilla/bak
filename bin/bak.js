#!/usr/bin/env node

const { program } = require('commander')
const { create, add, run } = require('../lib/commands')

program.version('0.0.1')

program
  .command('create <config_file>')
  .description('create config file')
  .action((configFile) => {
    create(configFile)
  })

program
  .command('add <file_folder> <config_file>')
  .description('add file or folder to config file')
  .action((fileOrFolder, configFile) => {
    add(configFile, fileOrFolder)
  })

program
  .command('run <config_file>')
  .description('run backup with file')
  .action((configFile) => {
    run(configFile)
  })

program.parse(process.argv)
