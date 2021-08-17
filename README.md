# template-file-action

This GitHub action creates a string using a
[liquid template](https://shopify.github.io/liquid/) and a JSON or YAML object,
then either creates a file or injects the result into an existing file.

## Usage

The following example creates the file `hello.md` with the content
`My name is Bob and I'm 31 years old.` and creates a commit with it.

```yaml
jobs:
  template:
    runs-on: ubuntu-latest
    steps:
      - uses: theappnest/template-file-action@v1
        with:
          template: 'My name is {{ name }} and I'm {{ age }} years old.'
          target: hello.md
          data: |
            name: Bob
            age: 31

      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: 'feat: create greeting'
          file_pattern: hello.md
```

### Injecting content into existing files

If the file already exists it will overwrite the file. If however you'd like to
inject the result into the file at a specific place you can use comments
containing start and end delimiters to do so.

The following delimiters are supported:

```txt
<!-- START_TEMPLATE -->
<!-- END_TEMPLATE -->
```

```txt
/* START_TEMPLATE */
/* END_TEMPLATE */
```

```txt
// START_TEMPLATE
// END_TEMPLATE
```

```txt
# START_TEMPLATE
# END_TEMPLATE
```

## Inputs

- `data` JSON or YAML object containing template data.
- `template` Liquid template.
- `target` Path of file to create/inject containt into.

## Outputs

- `modules` An array of paths to Terraform modules.
