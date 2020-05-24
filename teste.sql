

SELECT "AdaptedQuery"."query", COUNT("AdaptedQuery"."query") AS Amount FROM 
"Study" INNER JOIN ( "Search" INNER JOIN ( "AutomaticSearch" INNER JOIN "AdaptedQuery" 
    ON "AutomaticSearch"."id" = "AdaptedQuery"."AutomaticSearchId" ) 
        ON  "Search"."id" = "AutomaticSearch"."SearchId") 
ON (("Study"."SearchId" = "Search"."id") AND ("Study"."ProjectId" = 'c83b9bdf-476b-4a07-be00-4602a6ebe6e0') )


/*
SELECT "SelectionCriteria"."description", COUNT("SelectionResult"."status") AS Amount 
FROM "Study" INNER JOIN ( "SelectionResult" INNER JOIN ( "SelectionCriteria" INNER JOIN "SelectionResultSelectionCriteria" 
ON "SelectionCriteria"."id" = "SelectionResultSelectionCriteria"."SelectionCriteriaId" ) 
ON  "SelectionResult"."id" = "SelectionResultSelectionCriteria"."SelectionResultId") 
ON ( ("Study"."ProjectId" = 'c83b9bdf-476b-4a07-be00-4602a6ebe6e0') AND ("SelectionResult"."status" = 'rejected') ) 
GROUP BY "SelectionCriteria"."description";
*/

/*
SELECT "Study"."year", COUNT("SelectionResult"."status") AS Amount 
FROM "Study" INNER JOIN  "SelectionResult" ON "SelectionResult"."StudyId" = "Study"."id"
GROUP BY "Study"."year";
*/

/*
SELECT * FROM "SelectionResult" 
INNER JOIN ( "Study" INNER JOIN ("Project" INNER JOIN ("ProjectsSearchEngines" INNER JOIN "SearchEngine" 
ON "ProjectsSearchEngines"."SearchEngineId" = "SearchEngine"."id") 
ON "SearchEngine"."ProjectId" = "Project"."id") 
ON "Study". "ProjectId" = "Project"."id")
ON "SelectionResult"."StudyId" = "Study"."id";
*/

-- SELECT * FROM "Researcher" 
-- INNER JOIN ( "Study" INNER JOIN ("Project" INNER JOIN ("ProjectsSearchEngines" INNER JOIN "SearchEngine" 
-- ON "ProjectsSearchEngines"."SearchEngineId" = "SearchEngine"."id") 
-- ON "SearchEngine"."ProjectId" = "Project"."id") 
-- ON "Study". "ProjectId" = "Project"."id")
-- ON "SelectionResult"."StudyId" = "Study"."id";


SELECT "SearchEngine"."name", COUNT("Study"."id") AS Amount 
FROM "Study" INNER JOIN ( "Search" INNER JOIN ( "AutomaticSearch" INNER JOIN ( "AdaptedQuery" INNER JOIN "SearchEngine"
ON "SearchEngine"."id" = "AdaptedQuery"."SearchEngineId" ) 
ON  "AutomaticSearch"."id" = "AdaptedQuery"."AutomaticSearchId") 
ON "Search"."id" = "AutomaticSearch"."SearchId")
ON ( ("Search"."id" = "Study"."SearchId") AND ("Study"."ProjectId" = 'c83b9bdf-476b-4a07-be00-4602a6ebe6e0') ) 
GROUP BY "SearchEngine"."name";


'"Study"."id", "Study"."title", "Study"."authors", "Study"."citekey", "Study"."abstract", '+
'"Study"."keywords", "Study"."venue", "Study"."year", "Study"."pages", "Study"."volume", '+
'"Study"."url", "Study"."issn", "Study"."doi", "Study"."base", "Study"."search", '+
'"Study"."generalStatus", "Study"."venueType", "Study"."createdAt", "Study"."updatedAt", '+
'"SelectionResult"."id" as "sr_id", "SelectionResult"."status" as "sr_status", '+
'"SelectionResult"."createdAt" as "sr_createdat", "SelectionResult"."updatedAt"as "sr_updatedat", '+
'"SelectionStep"."id" as "ss_id", "SelectionStep"."startDate", "SelectionStep"."endDate", '+
'"SelectionStep"."dateChecker", "SelectionStep"."dateConflicts", "SelectionStep"."method", '+
'"SelectionStep"."status" as "ss_status", "SelectionStep"."ratedContent", "SelectionStep"."numCheckerStudy", '+
'"SelectionStep"."scoreBoard", "SelectionStep"."createdAt" as "ss_createdat", '+
'"SelectionStep"."updatedAt"as "ss_updatedat" '+


'"Study"."id", "Study"."title", "Study"."authors", "Study"."citekey", "Study"."abstract", '+
'"Study"."keywords", "Study"."venue", "Study"."year", "Study"."pages", "Study"."volume",  '+
'"Study"."url", "Study"."issn", "Study"."doi", "Study"."base", "Study"."search",  "Study"."generalStatus", '+
'"Study"."venueType", "Study"."createdAt", "Study"."updatedAt", "Study"."ProjectId", "Study"."SearchId",'+
' "Form"."id" as "form_id", "Form"."type", "Form"."status" as "form_status", "Form"."createdAt" as '+
'"form_createdat", "Form"."updatedAt" as "form_updatedat", "Form"."TemplateFormId", "Form"."StudyId", '+
'"Form"."ResearcherId", "Answer"."id" as "answer_id", "Answer"."content", "Answer"."supportData", '+
'"Answer"."option", "Answer"."status" as "answer_status", "Answer"."createdAt" as "answer_createdat", '+
'"Answer"."updatedAt" as "answer_updatedat", "Answer"."FormId", "Answer"."FieldId" '+




'SELECT "SelectionStep"."id", "SelectionStep"."startDate", "SelectionStep"."endDate", '+
'"SelectionStep"."dateChecker",   "SelectionStep"."dateConflicts", "SelectionStep"."method", '+
'"SelectionStep"."status", "SelectionStep"."ratedContent", "SelectionStep"."numCheckerStudy", '+
'"SelectionStep"."scoreBoard", "SelectionStep"."createdAt", "SelectionStep"."updatedAt", '+
'"Researcher"."name", "Researcher"."email" FROM "SelectionStep" INNER JOIN ("StudyAssigned" INNER JOIN '+
'"Researcher" ON (("StudyAssigned"."ResearcherId" = "Researcher"."id") AND '+
'("Researcher"."id" = :researcherid))) ON ( ("StudyAssigned"."SelectionStepId" = "SelectionStep"."id") '+
'AND ("SelectionStep"."id" = :selstepid) );'


'Select "Field"."id" as "field_id", "Field"."description", "Field"."option" as "field_option", '+
'"Field"."type", "Field"."position", "Answer"."id" as "answer_id", "Answer"."content", '+
'"Answer"."supportData", "Answer"."option" as "answer_option", "Answer"."status"  from "Field" '+
'inner join "Answer" on (("Field"."TemplateFormId" = `2acb2ee2-4ad2-484e-be72-199b8fd137d6`) AND '+
'("Answer"."FieldId" = "Field"."id"));'


SELECT * FROM 
"Project" INNER JOIN ("ProjectsResearchers" INNER JOIN "Researcher" ON 
(("ProjectsResearchers"."ResearcherId" = "Researcher"."id") AND 
("Researcher"."email" = 'ris.simone@gmail.com'))
ON "ProjectsResearchers"."ProjectId" = "Project"."id";