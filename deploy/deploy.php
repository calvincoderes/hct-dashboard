<?php
date_default_timezone_set('Asia/Manila');

// APPLICATION
define('APPLICATION', 'SPA');

// STAGING CONFIG
define('DEP_HOST', '52.76.204.128');
define('DEP_PORT', 22);
define('DEP_DEPLOY_PATH', '/var/www/spa-new');
define('DEP_PEM_FILE', '~/.ssh/hcai.pem');
define('DEP_USER', 'ubuntu');
define('DEP_BRANCH', 'master');
define('DEP_REPOSITORY', 'git@github.com:aimon/spa-new.git');

$host 		= DEP_HOST;
$port 		= DEP_PORT;
$user 		= DEP_USER;
$pemFile 	= DEP_PEM_FILE;
$depPath 	= DEP_DEPLOY_PATH;
$depRepo 	= DEP_REPOSITORY;
$depBranch 	= DEP_BRANCH;
$stage 		= !empty($argv[2]) ? $argv[2] : null;
$app		= null;
$branch		= null;

if (!empty($argv[2])) {
	$part = explode(':', $argv[2]);
	$currentStage = !empty($part[0]) ? $part[0] : null;
	$branch = !empty($part[2]) ? $part[2] : null;

	define('APP_STAGE', $currentStage);

	if (count($part) === 0) {
		exit('Format must be `php dep deploy stg` e.g. `php dep deploy prod` or `php dep deploy stg:<branch>`' . "\n");
	}
	if ($currentStage != 'stg' && $currentStage != 'prod' ) {
		exit('Deployment stage must be \'stg\' or \'prod\'' . "\n");
	}

	if ($branch) {
		$depBranch = $branch;
	}

	$depPath .= $app . '/';
 
	define('CURRENT_APP', strtoupper($app));
	define('CURRENT_STAGE', strtoupper($currentStage));
	define('CURRENT_BRANCH', $branch);
}

require 'recipe.php';

set('keep_releases', 1);

server('ec2', $host, $port)
    ->user($user)
    ->forwardAgent()
    ->pemFile($pemFile)
    ->stage($stage)
	->env('deploy_path', $depPath)
	->env('deploy_stage', strtolower(CURRENT_STAGE))
	->env('deploy_branch', $depBranch)
	->env('branch', $branch);
 
set('repository', $depRepo);
