# create-aws-credentials

This action creates `~/.aws/credentials` file for use in subsequent steps in a GitHub Action workflow.

## Example usage

```yaml
uses: ygpark80/create-aws-credentials@v1.5
with:
  profile: user1
  aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
  aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  aws-region: us-east-2
```
