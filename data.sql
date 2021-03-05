SET GLOBAL local_infile=1;
use `bug_tracker`;
drop table if exists `bug_assignments`;
drop table if exists `bugs`;
drop table if exists `user_salary_histories`;
drop table if exists `users`;

create table `users`(
    `username` varchar(64),
	`password` varchar(64), 
	`refresh_token` varchar(255), 
	primary key(`username`)
); 

insert into `users`(`username`, `password`) values
	('noah', '$2a$10$aMk9VEsdwFZLdW.F7bhkPetkWHfh1nf8Y/eoNBghK8Dd76PadrsmC'),
	('james', '$2b$10$PH0WW9ZAgvXKebOJNUwhruIyMo2IrLV9iNXKc5rOlUwl3ZcK63XIW'),
	('phil', '$2b$10$mA8TRKeVR9yJwev0yOYpyeeH3VHDMY2.2HRzsVH/w9kM9AgD/nw2e'),
	('boss', '$2a$10$aMk9VEsdwFZLdW.F7bhkPetkWHfh1nf8Y/eoNBghK8Dd76PadrsmC');

create table `user_salary_histories`(
	`username` varchar(64),
	`salary` decimal(10,2),
	`date` date,
	primary key(`username`, `salary`, `date`),
	foreign key(`username`) references `users`(`username`)
);

insert into `user_salary_histories` values
	('noah', 65000.00, '2015-01-01'),
	('phil', 75000.00, '2015-01-01'),
	('james', 85000.00, '2015-01-01'),
	('boss', 100000.00, '2015-01-01');

create table `bugs`(
	`bug_id` VARCHAR(7),
	`type` VARCHAR(3),
	`dt_reported` datetime,
	`report_comment` varchar(500),
	`reportee` varchar(64),
	foreign key(`reportee`) references `users`(`username`),
	primary key(`bug_id`)
);

LOAD DATA LOCAL INFILE 'C:\\Users\\Noah\\Documents\\webapps\\bug-tracker\\backend\\gendata\\bugs.csv'
REPLACE INTO TABLE `bugs` 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'(`bug_id`,`type`,`dt_reported`,`report_comment`,`reportee`);

create table `bug_assignments`(
	`assignee` varchar(64),
	`bug_id` varchar(7),
	`dt_start` datetime,
	`dt_end` datetime,
	`progress` TINYINT UNSIGNED,
	`role` varchar(64),
	foreign KEY(`assignee`) references `users`(`username`),
	foreign key(`bug_id`) references `bugs`(`bug_id`),
	PRIMARY key (`assignee`, `bug_id`)
);

LOAD DATA LOCAL INFILE 'C:\\Users\\Noah\\Documents\\webapps\\bug-tracker\\backend\\gendata\\bug_assignments.csv'
REPLACE INTO TABLE `bug_assignments` 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'(`assignee`,`bug_id`,`dt_start`,`dt_end`,`progress`, `role`);

-- use `bug_tracker`;
-- CREATE OR REPLACE VIEW cost_of_bugs
-- AS
-- select bug_id,
-- assignee, 
-- work_hours,
-- (user_salary_histories.salary) as salary,
-- (work_hours * (salary / 2080)) as cost
-- from (SELECT ((time_to_sec(timediff(dt_end, dt_start)) / 3600) * (5 / 21)) as work_hours, assignee, bug_id FROM bug_assignments) as bug_assignments
-- left join user_salary_histories
-- on bug_assignments.assignee = user_salary_histories.username;
-- 
-- select * from cost_of_bugs where bug_id = 'APLvNkj';
-- use `bug_tracker`;
-- select round(sum(cost), 2) from cost_of_bugs where bug_id = 'APLvNkj';
-- 
-- 
-- use `bug_tracker`;
-- select distinct bug_assignments.bug_id, bugs.* 
-- from bug_assignments 
-- left join bugs
-- on bug_assignments.bug_id = bugs.bug_id
-- where bug_assignments.assignee = 'noah';
-- 
-- use `bug_tracker`;
-- select distinct bug_assignments.bug_id, bugs.*, 
-- avg(distinct bug_assignments.progress) as progress_avg 
-- from bug_assignments 
-- left join bugs
-- on bug_assignments.bug_id = bugs.bug_id
-- where bug_assignments.assignee = 'noah' 
-- group by bugs.bug_id;