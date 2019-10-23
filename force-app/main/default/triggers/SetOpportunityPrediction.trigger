trigger SetOpportunityPrediction on Opportunity (after insert, after update) {
   if(System.isFuture()) return;
   if(ed_insights.CheckRecursive.runOnce()) {
   // custom Settings' name
   String CONFIG_NAME = 'OpportunityCustomSetting';
   ed_insights.TriggerHandler.insertUpdateHandle(CONFIG_NAME);
  }
}