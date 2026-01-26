# NPM Publishing Setup

This repository is configured to use NPM's [Trusted Publishers](https://docs.npmjs.com/trusted-publishers) feature with OIDC authentication via GitHub Actions.

## How It Works

When a new release is created on GitHub, the workflow automatically publishes the package to NPM using short-lived OIDC tokens instead of long-lived NPM tokens. This provides better security and includes cryptographic provenance attestations.

## Setup Instructions

To complete the trusted publisher configuration, a package maintainer needs to:

1. Go to [npmjs.com](https://www.npmjs.com) and log in
2. Navigate to the package: [@kulkul/tinyurl-client](https://www.npmjs.com/package/@kulkul/tinyurl-client)
3. Go to **Settings** → **Publishing** (or access directly at: `https://www.npmjs.com/package/@kulkul/tinyurl-client/access`)
4. Click **"Add trusted publisher"**
5. Configure with these details:
   - **Provider**: GitHub Actions
   - **Organization**: `kulkultech`
   - **Repository**: `tinyurl-client`
   - **Workflow**: `test-and-publish.yml`
   - **Environment**: Leave blank (not using deployment environments)

## Publishing a New Version

1. Update the version in `package.json`
2. Commit the change
3. Create a new release on GitHub with a tag (e.g., `v1.0.9`)
4. The GitHub Actions workflow will automatically:
   - Run tests
   - Build the package
   - Publish to NPM with provenance attestations

## Benefits

- 🔒 **Enhanced Security**: No long-lived NPM tokens stored as secrets
- ✅ **Provenance**: Cryptographic proof of where and how the package was built
- 🤖 **Automated**: Fully automated publishing on release creation
- 🔍 **Transparent**: Build logs and provenance are publicly verifiable

## Troubleshooting

If publishing fails:
1. Ensure the trusted publisher is configured on npmjs.com
2. Verify the repository, workflow name, and organization match exactly
3. Check that the release was created (not just a tag)
4. Review the GitHub Actions logs for detailed error messages
