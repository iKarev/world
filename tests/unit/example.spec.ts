import { shallowMount } from "@vue/test-utils";
import Vuetify from "@/components/Vuetify.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Vuetify, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
