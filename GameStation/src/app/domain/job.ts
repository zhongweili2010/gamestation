export interface Job {
    jobClassName?;
    jobName?;
    jobGroupName?;
    triggerName?;
    triggerGroupName?;
    cronExpression?;
    triggerState?;
    nextFireTime?;
    previousFireTime?;
}
