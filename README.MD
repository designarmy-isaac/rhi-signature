# RHI Email Signature Generator

Start by making sure you have up-to-date versions of `node`, `npm`, `npx` and `gulp-cli` installed globally.

Navigate to this folder with Terminal and execute `npm install` to install the dependencies for the build tool.

Run the command `gulp` to generate the email signatures. This will take the data in `data/data.json` and pipe it into the templates in `src` and put the resulting `html` files in the `dist` directory, and then open them all in your default browser.