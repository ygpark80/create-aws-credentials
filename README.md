# create-aws-credentials

This action creates `~/.aws/credentials` file for use in subsequent steps in a GitHub Action workflow.

## Usage

See [action.yml](action.yml)

```yaml
- uses: ygpark80/create-aws-credentials@v1.5
  with:
    # AWS profile name.
    profile: ''
    # AWS Region, e.g. us-east-2
    aws-region: ''
    # AWS Access Key ID.
    aws-access-key-id: ''
    # AWS Secret Access Key.
    aws-secret-access-key: ''
```
