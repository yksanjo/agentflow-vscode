const vscode = require('vscode');

const workflows = [
  { id: '1', title: 'Auto PR Reviewer', description: 'AI-powered pull request reviews', price: 29, rating: 4.8 },
  { id: '2', title: 'Deploy Master', description: 'Cloud deployment workflow', price: 49, rating: 4.9 },
  { id: '3', title: 'Test Suite Pro', description: 'Testing with coverage reports', price: 0, rating: 4.7 },
  { id: '4', title: 'Security Scanner', description: 'Vulnerability detection', price: 29, rating: 4.6 },
  { id: '5', title: 'Auto Docs Generator', description: 'Auto-generate documentation', price: 15, rating: 4.5 },
  { id: '6', title: 'ML Pipeline Runner', description: 'ML pipeline with training', price: 49, rating: 4.9 },
];

function activate(context) {
  // Browse workflows command
  const browseCmd = vscode.commands.registerCommand('agentflow.browse', async () => {
    const items = workflows.map(w => ({
      label: w.title,
      description: `${w.description} - ${w.price === 0 ? 'FREE' : '$' + w.price}`,
      detail: `Rating: ${w.rating}★`
    }));

    const selected = await vscode.window.showQuickPick(items, {
      placeHolder: 'Select a workflow to install'
    });

    if (selected) {
      vscode.window.showInformationMessage(`Selected: ${selected.label}`);
    }
  });

  // Install workflow command
  const installCmd = vscode.commands.registerCommand('agentflow.install', async () => {
    const items = workflows.map(w => ({
      label: w.title,
      description: w.price === 0 ? 'Free' : `$${w.price}`
    }));

    const selected = await vscode.window.showQuickPick(items, {
      placeHolder: 'Select a workflow to install'
    });

    if (selected) {
      const choice = await vscode.window.showInformationMessage(
        `Install "${selected.label}"?`,
        'Install',
        'Cancel'
      );

      if (choice === 'Install') {
        vscode.window.showInformationMessage(`✓ Installed "${selected.label}" successfully!`);
      }
    }
  });

  context.subscriptions.push(browseCmd, installCmd);
}

function deactivate() {}

module.exports = { activate, deactivate };
