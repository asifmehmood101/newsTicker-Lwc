public with sharing class NewsMessageController {
    @AuraEnabled (cacheable=true)
    public static List<NewsMessage> getNewsMessageList() {
        return [select Id, Message, StartDate, EndDate, RecommendationAudiences from NewsMessage LIMIT 5]
    }
}

