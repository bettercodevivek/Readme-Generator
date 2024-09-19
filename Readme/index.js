#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const questions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?',
        validate: input => input ? true : 'Project name is required.'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a short description of the project:'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Installation instructions (e.g., npm install):'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide Usage instructions:'
    },
    {
        type: 'input',
        name: 'technologies',
        message: 'List the technologies used in your project (comma separated):',
        default: 'JavaScript, Node.js, React, Express'
    },
    {
        type: 'input',
        name: 'screenshot1',
        message: 'Add First Screenshot URL of your project:'
    },
    {
        type: 'input',
        name: 'screenshot2',
        message: 'Add Second Screenshot URL of your project:'
    },
    {
        type: 'input',
        name: 'screenshot3',
        message: 'Add Third Screenshot URL of your project:'
    },
    {
        type: 'input',
        name: 'screenshot4',
        message: 'Add Fourth Screenshot URL of your project:'
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Contribution guidelines (optional):'
    },
    {
        type: 'input',
        name: 'license',
        message: 'License type (e.g., MIT, Apache):',
        default: 'MIT'
    },
    {
        type: 'confirm',
        name: 'preview',
        message: 'Would you like to preview the README before generating the file?',
        default: true
    }
];

const GenerateReadme = (answers) => {

    function getColorForTech(tech) {
        
      const colors = {
        'JavaScript': 'F7DF1E',
        'Node.js': '339933',
        'React': '61DAFB',
        'Express': '000000',
        'Python': '306998',
        'Django': '092D4C',
        'Flask': '000000',
        'Ruby': 'CC342D',
        'Rails': 'CC0000',
        'Java': '007396',
        'Spring': '6DB33F',
        'Kotlin': 'F18E33',
        'PHP': '8993C0',
        'Laravel': 'FF2D20',
        'C++': '00599C',
        'C#': '239120',
        'Go': '00ADD8',
        'Rust': '000000',
        'Swift': 'F05138',
        'TypeScript': '3178C6',
        'Vue.js': '42b883',
        'Angular': 'DD0031',
        'Sass': 'CC6699',
        'Less': '1D365D',
        'Bootstrap': '563D7C',
        'Tailwind CSS': '06B6D4',
        'Webpack': '8DD6F9',
        'Jest': '99424F',
        'Mocha': '8D6748',
        'Docker': '2496ED',
        'Kubernetes': '326CE5',
        'AWS': '232F3E',
        'Azure': '0078D4',
        'Google Cloud': '4285F4',
        'Git': 'F1502F',
        'GitHub': '181717',
        'GitLab': 'FCA121',
        'Bitbucket': '0052CC',
        'PostgreSQL': '336791',
        'MySQL': '4479A1',
        'MongoDB': '47A248',
        'SQLite': '003B57',
        'Redis': 'D82C20',
        'Elasticsearch': '005571',
        'GraphQL': 'E10098',
        'Apollo': 'FF6F00',
        'Jenkins': 'D24939',
        'Travis CI': '3E9CFF',
        'CircleCI': '3C9CFF',
        'Terraform': '623CE4',
        'Ansible': 'EE0000'
    };
    
        return colors[tech] || 'blue'; 
    }

    function getLogoForTech(tech) {

      const logos = {
        'JavaScript': 'javascript',
        'Node.js': 'node.js',
        'React': 'react',
        'Express': 'express',
        'Python': 'python',
        'Django': 'django',
        'Flask': 'flask',
        'Ruby': 'ruby',
        'Rails': 'rails',
        'Java': 'java',
        'Spring': 'spring',
        'Kotlin': 'kotlin',
        'PHP': 'php',
        'Laravel': 'laravel',
        'C++': 'cplusplus',
        'C#': 'csharp',
        'Go': 'go',
        'Rust': 'rust',
        'Swift': 'swift',
        'TypeScript': 'typescript',
        'Vue.js': 'vue.js',
        'Angular': 'angular',
        'Sass': 'sass',
        'Less': 'less',
        'Bootstrap': 'bootstrap',
        'Tailwind CSS': 'tailwindcss',
        'Webpack': 'webpack',
        'Jest': 'jest',
        'Mocha': 'mocha',
        'Docker': 'docker',
        'Kubernetes': 'kubernetes',
        'AWS': 'amazonaws',
        'Azure': 'azure',
        'Google Cloud': 'googlecloud',
        'Git': 'git',
        'GitHub': 'github',
        'GitLab': 'gitlab',
        'Bitbucket': 'bitbucket',
        'PostgreSQL': 'postgresql',
        'MySQL': 'mysql',
        'MongoDB': 'mongodb',
        'SQLite': 'sqlite',
        'Redis': 'redis',
        'Elasticsearch': 'elasticsearch',
        'GraphQL': 'graphql',
        'Apollo': 'apollo',
        'Jenkins': 'jenkins',
        'Travis CI': 'travisci',
        'CircleCI': 'circleci',
        'Terraform': 'terraform',
        'Ansible': 'ansible'
    };
    
        return logos[tech] || ''; 
    }

   
    let technologyBadges = '';
    if (answers.technologies) {
        const techList = answers.technologies.split(',').map(tech => tech.trim());
        technologyBadges = '## Technologies Used\n';
        techList.forEach(tech => {
            const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(tech)}-%23${getColorForTech(tech)}?logo=${getLogoForTech(tech)}&logoColor=white`;
            technologyBadges += `![${tech}](${badgeUrl})\n`;
        });
        technologyBadges += '\n';
    }

   
    const screenshots = ['screenshot1', 'screenshot2', 'screenshot3', 'screenshot4']
        .map(key => answers[key] ? `<p align='center'><img src='${answers[key]}'> </p>` : '')
        .filter(img => img)
        .join('\n\n');

    return `
# ${answers.projectName}

## Description
${answers.description}

## Installation
\`\`\`bash
${answers.installation}
\`\`\`

## Screenshots
${screenshots}

${technologyBadges}

## Usage
\`\`\`bash
${answers.usage}
\`\`\`

${answers.contributing ? `## Contributing\n${answers.contributing}\n` : ''}

## License
This project is licensed under the ${answers.license} License.`;
};

const writeReadme = (content) => {
    const filepath = path.join(process.cwd(), 'README.md');
    fs.writeFileSync(filepath, content);
    console.log(chalk.blue(`README.md generated successfully at ${filepath}`));
};

inquirer.prompt(questions).then(answers => {
    const readmeContent = GenerateReadme(answers);

    if (answers.preview) {
        console.log(chalk.yellow('\n--- Preview of README.md ---\n'));
        console.log(readmeContent);
        console.log(chalk.yellow('\n--- End of Preview ---\n'));
    }

    inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmGenerate',
            message: 'Do you want to proceed and generate the README.md file?',
            default: true
        }
    ]).then(confirmAnswers => {
        if (confirmAnswers.confirmGenerate) {
            writeReadme(readmeContent);
        } else {
            console.log(chalk.red('README.md generation canceled.'));
        }
    });
});
