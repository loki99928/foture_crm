export const style = {
    style: {
        sass: {
            loaderOptions: {
                additionalData: `
                    @import "/src/templates/assets/scss/normalize.scss";
                    @import "src/templates/assets/scss/settings.scss";
                    @import "src/templates/assets/scss/smart-grid.scss";
              `,
            },
        }
    }
};