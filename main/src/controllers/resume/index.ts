import createResume from './create.controller'
import addInfo from './info.controller'
import getInfo from './getInfo.controller'
import updateInfo from './update.controller'
import list from './list.controller'

export default {
    create: createResume,
    info: addInfo,
    get: getInfo,
    update: updateInfo,
    list
}