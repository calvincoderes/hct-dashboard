<?php

require_once __DIR__ . '/common.php';

task('deploy', function() {
  echo run("
    cd {{deploy_path}};
    sudo git fetch origin {{deploy_branch}};
    sudo git reset --hard FETCH_HEAD;
    sudo git clean -df;
    sudo git pull origin {{deploy_branch}};
    sudo yarn;
    sudo yarn build;
  ");
  echo run("cd /var/www/spa-new && sudo pm2 start process.yml");
  echo run("cd /var/www/spa-new && sudo pm2 restart process.yml");
})->desc('Deploying...');

after('deploy', 'success');
