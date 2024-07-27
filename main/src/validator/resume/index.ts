import createResume from './create.validator'
import addInfo from './info.validator'
import updateInfo from './update.validator'

export default {
    create: createResume,
    info: addInfo,
    update: updateInfo
}