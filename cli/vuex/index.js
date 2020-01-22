/* eslint-disable no-unused-vars */
const fs = require('fs')
const _ = require('lodash')
const replaceall = require('replaceall')
const pluralize = require('pluralize')

const createFile = (filePath, content) => {
  fs.stat(filePath, (err, stat) => {
    if (err === null) {
      console.log(filePath + ' EXISTS')
    } else if (err.code === 'ENOENT') {
      fs.writeFile(filePath, content, (err) => {
        if (err) {
          return console.log(err)
        }
        console.log('CREATED ' + filePath)
      })
    } else {
      console.log('Some other error: ', err.code)
    }
  })
}

const constantString = (string) => {
  return String(replaceall(' ', '_', _.startCase(_.camelCase(string)))).toUpperCase()
}

const ucFirst = (string) => {
  return replaceall(' ', '', _.startCase(_.camelCase(string)))
}

const replaceInstances = (string, subject) => {
  string = replaceall('MODULE_TEMPLATES', pluralize(constantString(subject)), string)
  string = replaceall('MODULE_TEMPLATE', pluralize.singular(constantString(subject)), string)

  string = replaceall('moduleTemplates', pluralize(_.camelCase(subject)), string)
  string = replaceall('moduleTemplate', pluralize.singular(_.camelCase(subject)), string)

  string = replaceall('ModuleTemplates', pluralize(ucFirst(_.camelCase(subject))), string)
  string = replaceall('ModuleTemplate', pluralize.singular(ucFirst(subject)), string)

  string = replaceall('module_templates', pluralize(subject.toLowerCase()), string)
  string = replaceall('module_template', pluralize.singular(subject.toLowerCase()), string)

  string = replaceall('module-templates', pluralize(_.kebabCase(subject).toLowerCase()), string)
  string = replaceall('module-template', pluralize.singular(_.kebabCase(subject).toLowerCase()), string)

  string = replaceall('Module Templates', pluralize(_.startCase(_.camelCase(subject))), string)
  string = replaceall('Module Template', pluralize.singular(_.startCase(_.camelCase(subject))), string)

  return string
}

const generatePage = (directory) => {
  /** STORE */
  // Store Actions
  let actionsContent = fs.readFileSync('./cli/vuex/store/actions.js', 'utf8')
  actionsContent = replaceInstances(actionsContent, directory)

  // Store Getters
  let gettersContent = fs.readFileSync('./cli/vuex/store/getters.js', 'utf8')
  gettersContent = replaceInstances(gettersContent, directory)

  // Store Index
  let indexContent = fs.readFileSync('./cli/vuex/store/index.js', 'utf8')
  indexContent = replaceInstances(indexContent, directory)

  // Store Mutations
  let mutationsContent = fs.readFileSync('./cli/vuex/store/mutations.js', 'utf8')
  mutationsContent = replaceInstances(mutationsContent, directory)

  // Store State
  let stateContent = fs.readFileSync('./cli/vuex/store/state.js', 'utf8')
  stateContent = replaceInstances(stateContent, directory)

  // Sync directory
  const kebab = _.kebabCase(directory).toLowerCase()
  const underscore = pluralize(replaceall('-', '_', kebab))

  // Directories
  const storeDirectory = './store/' + underscore

  if (!fs.existsSync(storeDirectory)) {
    fs.mkdirSync(storeDirectory)
  }
  createFile(storeDirectory + '/actions.js', actionsContent)
  createFile(storeDirectory + '/getters.js', gettersContent)
  createFile(storeDirectory + '/index.js', indexContent)
  createFile(storeDirectory + '/mutations.js', mutationsContent)
  createFile(storeDirectory + '/state.js', stateContent)
}

const generateImports = (fileName) => {
  const className = pluralize.singular(ucFirst(fileName))
  const kebabName = pluralize.singular(_.kebabCase(fileName).toLowerCase())
  const underscoreName = pluralize(replaceall('-', '_', kebabName))

  // IMPORT VUEX STORE
  fs.readFile('./store/index.js', 'utf8', function (err, data) {
    if (err) {
      throw err
    }

    let content = fs.readFileSync('./store/index.js', 'utf8')

    const importStore = 'import ' + underscoreName + ' from \'./' + underscoreName + '\'' + '\n' +
        '/** REPLACE_IMPORT_STORE */'

    content = replaceall('/** REPLACE_IMPORT_STORE */', importStore, content)

    const combineStore = underscoreName + ',' + '\n' +
        '      /** REPLACE_INCLUDE_STORE */'

    content = replaceall('/** REPLACE_INCLUDE_STORE */', combineStore, content)

    fs.writeFile('./store/index.js', content, 'utf8', function (err) {
      if (err) {
        return console.log(err)
      }
    })
  })
}

process.argv.forEach(function (resource, index, array) {
  if (index === 2) {
    const className = ucFirst(_.kebabCase(resource))

    generatePage(className)
    generateImports(className)
  }
})
