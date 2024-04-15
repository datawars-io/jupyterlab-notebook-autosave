# JupyterLab Notebook autosave extension

A JupyterLab extension that will autosave your open Notebook.

![jupyterlab-notebook-autosave](https://github.com/datawars-io/jupyterlab-notebook-autosave/assets/7065401/962ebef6-5d7a-496d-a97f-75634b7023aa)

## Requirements

- JupyterLab >= 4.0

## Development install

> Note: You will need NodeJS to build the extension package.

> The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone this repo to your local environment

# Change directory to the cloned directory

# Install package in development mode
pip install -e .

# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite

# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch

# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

### Uninstall 

Delete the extension folder direction from the installation directory:

```bash
cd /Users/{USER}/.venv/share/jupyter/labextensions/jupyterlab-notebook-autosave
```

## Production install

TODO
