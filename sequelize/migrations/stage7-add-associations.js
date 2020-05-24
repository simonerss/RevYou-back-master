"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
		"SelectionResult", // name of Source model
		"StudyId", // name of the key we're adding
		{
		  type: Sequelize.UUID,
		  references: {
			model: "Study", // name of Target model
			key: "id" // key in Target model that we're referencing
		  },
		  onUpdate: "CASCADE",
		  onDelete: "SET NULL"
		}
    )
    .then(() => {
      return queryInterface.addColumn(
        "SelectionResult", // name of Source model
        "ResearcherId", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "Researcher", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        "ExtractionStep", // name of Source model
        "ProjectId", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "Project", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        "TemplateForm", // name of Source model
        "ExtractionStepId", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "ExtractionStep", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        "Field", // name of Source model
        "TemplateFormId", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "TemplateForm", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        "Form", // name of Source model
        "TemplateFormId", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "TemplateForm", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        "Answer", // name of Source model
        "FormId", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "Form", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        "Answer", // name of Source model
        "FieldId", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "Field", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        "Form", // name of Source model
        "StudyId", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "Study", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        "Form", // name of Source model
        "ResearcherId", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "Researcher", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      );
    })
  },
 
  down: (queryInterface, Sequelize) => {
	return queryInterface.removeColumn(
		"SelectionResult", // name of Source model
		"StudyId" // key we want to remove
	)
    .then(()=>{
      return queryInterface.removeColumn(
        "SelectionResult", // name of Source model
        "ResearcherId" // key we want to remove
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        "ExtracionStep", // name of Source model
        "ProjectId" // key we want to remove
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        "TemplateForm", // name of Source model
        "ExtractionStepId" // key we want to remove
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        "Field", // name of Source model
        "TemplateFormId" // key we want to remove
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        "Form", // name of Source model
        "TemplateFormId" // key we want to remove
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        "Answer", // name of Source model
        "FormId" // key we want to remove
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        "Answer", // name of Source model
        "FieldId" // key we want to remove
      )
    })
    .then(()=>{
      return queryInterface.removeColumn(
        "Form", // name of Source model
        "StudyId" // key we want to remove
      )
    })
    .then(()=>{
      return queryInterface.removeColumn(
        "Form", // name of Source model
        "ResearcherId" // key we want to remove
      )
    })
  }
};
