import BaseSelect from "./BaseSelect";

describe("@components/BaseSelect", () => {
	it(...isValidComponent(BaseSelect));

	it("render component", () => {
		const testLabel = "test";
		const wrapper = shallowMount(BaseSelect, {
			propsData: {
				value: [
					{
						name: "Donald",
						id: "donald",
					},
					{
						name: "Kim",
						id: "kim",
					},
				],
				options: [
					{
						name: "Donald",
						id: "donald",
					},
					{
						name: "Kim",
						id: "kim",
					},
					{
						name: "Gerhard",
						id: "gerhard",
					},
				],
				optionLabel: "name",
				label: testLabel,
			},
		});
		expect(wrapper.find("multi-select-stub").exists()).toBe(true);
		expect(wrapper.find(".label").text()).toBe(testLabel);
	});
});
