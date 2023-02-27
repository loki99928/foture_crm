export const style = {
    sass: {
        loaderOptions: {
            additionalData: `
      @import "src/templates/assets/scss/Normalize.css";
      @import "src/templates/assets/scss/Settings.scss";
      @import "src/templates/assets/scss/smart-grid.scss";
      `,
        },
    },
};