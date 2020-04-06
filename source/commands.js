const inquirer = require('inquirer')
const path = require('path')
const util = require('./util')

/**
 * Create command
 * @param {string} configFile Configuration file path
 */
const create = async (configFile) => {
  // Get absolute paths
  const absolutePathConfigFile = path.resolve(configFile)
  let absoluteBackupPath = path.dirname(configFile)

  // Check if configuration file exist
  const existConfigFile = await util.existFileOrFolder(absolutePathConfigFile)
  if (existConfigFile) {
    console.log('The configuration file already exist')
    return
  }

  // Ask for the path where to make the backup
  let answers
  try {
    answers = await inquirer
      .prompt([{
        type: 'input',
        name: 'backupPath',
        message: 'Directory where the backup will be made?',
        default: absoluteBackupPath
      }
      ])
  } catch (error) {
    return
  }

  // Get relative backup path
  absoluteBackupPath = path.resolve(answers.backupPath)

  // Check if backup folder exist
  const existBackupFolder = await util.existFileOrFolder(absoluteBackupPath)
  if (!existBackupFolder) {
    console.log('The backup directory doesn\'t exist')
    return
  }

  // Create default configuration object
  const config = {
    path: absoluteBackupPath,
    backup: []
  }

  // Save configuration file
  const fileSaved = util.saveConfigFile(config, absolutePathConfigFile)

  // Message
  if (fileSaved) {
    console.log('Backup configuration created successfully')
  } else {
    console.log('Error saving configuration file')
  }
}

/**
 * Add command
 * @param {string} configFile Configuration file path
 * @param {string} fileOrFolder File or folder path
 */
const add = async (configFile, fileOrFolder) => {
  // Get absolute paths
  const absolutePathConfigFile = path.resolve(configFile)
  const absolutePathFileOrFolder = path.resolve(fileOrFolder)

  // Check if configuration file exist
  const existConfigFile = await util.existFileOrFolder(absolutePathConfigFile)
  if (!existConfigFile) {
    console.log('The configuration file doesn\'t exist')
    return
  }

  // Read configuration file
  const config = await util.readConfigFile(configFile)

  // If the backup array doesn't exist, add it
  if (!('backup' in config)) {
    config.backup = []
  }

  // Check if the file or folder exist
  const existFileOrFolder = util.existFileOrFolder(absolutePathFileOrFolder)
  if (!existFileOrFolder) {
    console.log('The file or folder doesn\'t exist')
    return
  }

  // Check if the file or folder doesn't exist in the backup array
  if (util.isFileOrFolderInBackup(config.backup, absolutePathFileOrFolder)) {
    console.log('The file or folder already exist in the configuration file')
    return
  }

  // Ask for additional options
  let answers
  try {
    answers = await inquirer
      .prompt([{
        type: 'list',
        name: 'compression',
        message: 'Compression type?',
        default: 0,
        choices: [
          'none',
          '7zip',
          'zip'
        ]
      }
      ])
  } catch (error) {
    return
  }

  // Add new object
  config.backup.push({
    path: absolutePathFileOrFolder,
    ...answers
  })

  // Save configuration file
  const fileSaved = util.saveConfigFile(config, absolutePathConfigFile)

  // Message
  if (fileSaved) {
    console.log('File or folder added successfully')
  } else {
    console.log('Error saving configuration file')
  }
}

/**
 * Run command
 * @param {string} configFile Configuration file path
 */
const run = async (configFile) => {

}

module.exports = {
  create,
  add,
  run
}
