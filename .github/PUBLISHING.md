# NPM Publishing Setup

This repository is configured to publish packages to NPM via GitHub Actions using a standard NPM authentication token.

## How It Works

When a new release is created on GitHub, the workflow automatically publishes the package to NPM using the NPM_TOKEN secret.

## Setup Instructions

To configure NPM publishing, a package maintainer needs to:

1. Generate an NPM automation token at [npmjs.com](https://www.npmjs.com)
2. Add the token as a GitHub secret:
   - Go to repository **Settings** → **Secrets and variables** → **Actions**
   - Click **"New repository secret"**
   - Name: `NODE_AUTH_TOKEN`
   - Value: Your NPM automation token

## Publishing a New Version

1. Update the version in `package.json`
2. Commit the change
3. Create a new release on GitHub with a tag (e.g., `v1.0.9`)
4. The GitHub Actions workflow will automatically:
   - Run tests
   - Build the package
   - Publish to NPM

## Benefits

- 🤖 **Automated**: Fully automated publishing on release creation
- ✅ **Tested**: Package is only published after tests pass
- 🔍 **Transparent**: Build logs are publicly available

## Troubleshooting

If publishing fails:
1. Ensure the `NODE_AUTH_TOKEN` secret is configured correctly
2. Verify the NPM token has appropriate permissions
3. Check that the release was created (not just a tag)
4. Review the GitHub Actions logs for detailed error messages
