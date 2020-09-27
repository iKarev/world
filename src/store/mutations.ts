import merge from "lodash/merge";
import mapMutations from "./mutations/map";

const mutations = merge({}, mapMutations);

export default mutations;
