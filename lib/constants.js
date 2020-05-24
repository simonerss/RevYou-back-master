module.exports = Object.freeze({
  stepMethods: { EMI: 'EMI', EMCCA: 'EMCCA', EMCRA: 'EMCRA', EMCRS: 'EMCRS' },
  fieldTypes: { OPEN: 'open', SINGLE: 'single', MULTIPLE: 'multiple' },
  formTypes: { EXTRACTION: 'extraction', FINAL: 'final' },
  formStatus: { ASSIGNED: 'assigned', ON_GOING: 'on_going', FILLED: 'filled' },
  answerStatus: {
    PENDING: 'pending',
    FILLED: 'filled',
    IN_CONFLIC: 'in_conflict',
    FINAL: 'final'
  },
  selectionResultStatus: { IN_CONFLIC: 'in_conflict', ACCEPTED: 'accepted', REJECTED: 'rejected' },
  stepStatus: {
    SETTING: 'setting',
    ON_GOING: 'on_going',
    SETTING_DECISORS: 'setting_decisors',
    REVIEWING: 'reviewing',
    SOLVING_CONFLICTS: 'solving _conflicts',
    FINISHED: 'finished'
  },
  ratedContent: {
    TITLE: "title",
    TITLE_ABSTRACT: "title_abstract",
    TITLE_ABSTRACT_INTRODUCTION: "title_abstract_introduction",
    TITLE_ABSTRACT_INTRODUCTION_CONCLUSION:
      "title_abstract_introduction_conclusion",
    FULL_TEXT: "full_text"
  },
  stepMethods: { 
    EMI: "EMI", 
    EMCCA: "EMCCA", 
    EMCRA: "EMCRA", 
    EMCRS: "EMCRS" 
  },
  stepSelectionStatus: {
    SETTING: "setting",
    ON_GOING: "on_going",
    SETTING_DECISON_MAKERS: "setting_decison_makers",
    REVIEWING: "reviewing",
    SOLVING_CONFLICTS: "solving _conflicts",
    FINISHED: "finished"
  },
  studyAssignedStatus: {
    ASSIGNED: "assigned",
    ACCEPTED: "accepted",
    REJECTED: "rejected"
  },
  criteriaType: {
    INCLUSION: "inclusion",
    EXCLUSION: "exclusion"
  },
  getEnumArray: function (enumeration) { return Object.keys(enumeration).map((key) => enumeration[key]) }
});