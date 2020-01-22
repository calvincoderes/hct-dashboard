<?php
set('keep_releases', 3);
set('shared_dirs', []);
set('shared_files', []);
set('copy_dirs', []);
set('writable_dirs', []);
set('writable_use_sudo', true);
set('http_user', null);

/**
 * Environment vars
 */
env('timezone', 'UTC');
env('branch', '');
env('env_vars', '');
env('composer_options', 'install --no-dev --verbose --prefer-dist --optimize-autoloader --no-progress --no-interaction');

/**
 * Default arguments and options.
 */
argument('stage', \Symfony\Component\Console\Input\InputArgument::OPTIONAL, 'Run tasks only on this server or group of servers.');
option('tag', null, \Symfony\Component\Console\Input\InputOption::VALUE_OPTIONAL, 'Tag to deploy.');

task('success', function () {
    writeln("<info>SUCCESSFULL DEPLOYMENT!</info>");
})
->once()
->setPrivate();
