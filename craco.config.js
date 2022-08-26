const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@body-background': "#FEFDFF",
              '@component-background': "#F3F5F8",
              '@primary-color': '#023b59', // primary color for all components
              '@link-color': '#023b59', // link color
              '@success-color': '#52c41a', // success state color
              '@warning-color': '#faad14', // warning state color
              '@error-color': '#f5222d', // error state color
              '@font-size-base': '16px', // major text font size
              '@heading-color': '#023b59', // heading text color
              '@text-color': '#023b59', // major text color
              '@text-color-secondary': '#482673', // secondary text color
              '@disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color
              '@border-radius-base': '10px', // major border radius
              '@border-color-base': '#023b59', // major border color,
              '@background-color-light': '#F3F5F8',
              '@table-header-bg': '#dcdee0',
              '@table-row-hover-bg': '#FEFDFF',
              '@dropdown-menu-bg': '#F3F5F8',
              '@select-dropdown-bg': '#F3F5F8'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
