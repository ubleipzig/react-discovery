import {Domain} from '@react-discovery/views'
import {IConfig} from "@react-discovery/configuration"

export const hsp2: IConfig = {
  collections: {
    hsp2: {
      docTypes: [
        {
          key: '',
          label: 'all'
        },
        {
          key: 'Kulturobjekt',
          label: 'culturalObjects'
        },
        {
          key: 'Beschreibung',
          label: 'descriptions'
        },
        {
          key: 'Digitalisat',
          label: 'digitalisations'
        },
        {
          groupField: 'personFullname_t',
          key: 'Person',
          label: 'persons'
        },
        {
          key: 'Annotation',
          label: 'annotations'
        }
      ],
      hitComponents: [
        {
          defaultOption: true,
          expandedView: false,
          filteredFields: ['author', 'material', 'format', 'originPlace', 'originDate'],
          hitComponent: "Kulturobjekt",
          type: "list"
        },
        {
          expandedView: false,
          hitComponent: "GridComponent",
          type: "grid"
        },
        {
          expandedView: false,
          hitComponent: "Beschreibung",
          type: "list"
        },
        {
          expandedView: false,
          hitComponent: "Digitalisat",
          type: "list"
        },
        {
          expandedView: false,
          filteredFields: ['author', 'material', 'format', 'originPlace', 'originDate', 'formType',
            'status', 'writingStyle', 'language', 'previousOwner'],
          hitComponent: "Info",
          type: "list"
        },
        {
          expandedView: true,
          filteredFields: ['author', 'material', 'format', 'originPlace', 'originDate', 'formType',
            'status', 'writingStyle', 'language', 'previousOwner'],
          hitComponent: "KulturobjektExpanded",
          type: "list"
        },
        {
          expandedView: false,
          hitComponent: "Person",
          type: "list"
        },
      ],
      name: 'Handschriftenportal',
      primaryTypeField: Domain.KULTUROBJEKT,
      refinementListFilters: {
        1: {
          field: "entstehungsort_s.keyword",
          label: "originPlace",
          size: 10
        },
        2: {
          field: "status_t.keyword",
          label: "status",
          size: 10
        },
        3: {
          field: "schreibsprache_t.keyword",
          label: "language",
          size: 10
        },
        4: {
          field: "author_t.keyword",
          label: "author",
          size: 10
        }
      },
      searchFields: [
        {
          field: "id",
          label: "id",
          type: "text"
        },
        {
          field: "type_s",
          label: "type",
          type: "list-facet"
        },
        {
          field: "entities.annotationTarget_s",
          isChild: true,
          label: "annotationTarget",
          type: "text"
        },
        {
          field: "entities.annotationBody_t",
          isChild: true,
          label: "annotationBody",
          type: "text"
        },
        {
          field: "entities.beschreibungText_t",
          isChild: true,
          label: "descriptionText",
          type: "text"
        },
        {
          field: "entities.beschreibungTitle_t",
          isChild: true,
          label: "beschreibungTitle",
          type: "text"
        },
        {
          field: "entities.entities.beschreibungFaszikelLabel_t",
          isGrandchild: true,
          label: "beschreibungFaszikelLabel",
          type: "text"
        },
        {
          field: "entities.entities.beschreibungFaszikelText_t",
          isGrandchild: true,
          label: "beschreibungFaszikelText",
          type: "text"
        },
        {
          field: "entities.digitalisatDescription_t",
          isChild: true,
          label: "digitalisatDescription",
          type: "text"
        },
        {
          field: "entities.digitalisatTitel_t",
          isChild: true,
          label: "digitalisatTitel",
          type: "text"
        },
        {
          field: "entities.digitalisatManifestId_s",
          isChild: true,
          label: "manifest",
          type: "text"
        },
        {
          field: "titel_t",
          label: "Title",
          type: "text"
        },
        {
          field: "subtitel_t",
          label: "Subtitel",
          type: "text"
        },
        {
          field: "author_t",
          label: "author",
          type: "text"
        },
        {
          field: "stoff_t",
          label: "material",
          type: "list-facet"
        },
        {
          field: "format_t",
          label: "format",
          type: "list-facet"
        },
        {
          field: "entstehungsort_s",
          label: "originPlace",
          type: "list-facet"
        },
        {
          field: "entstehungdatum_t",
          label: "originDate",
          type: "text"
        },
        {
          field: "formtyp_t",
          label: "formType",
          type: "text"
        },
        {
          field: "status_t",
          label: "status",
          type: "list-facet"
        },
        {
          field: "schrift_t",
          label: "writingStyle",
          type: "list-facet"
        },
        {
          field: "schreibsprache_t",
          label: "language",
          type: "list-facet"
        },
        {
          field: "vorbesitzer_s",
          label: "previousOwner",
          type: "list-facet"
        },
        {
          field: "entities.personFullname_t",
          isChild: true,
          label: "personFullName",
          type: "list-facet"
        },
        {
          field: "entities.personBirthDate_dt",
          isChild: true,
          label: "personBirthDate",
          type: "range-racet"
        },
        {
          field: "entities.personDeathDate_dt",
          isChild: true,
          label: "personDeathDate",
          type: "range-racet"
        },
        {
          field: "entities.personBirthPlace_t",
          isChild: true,
          label: "personBirthPlace",
          type: "list-facet"
        },
        {
          field: "entities.personDeathPlace_t",
          isChild: true,
          label: "personDeathPlace",
          type: "list-facet"
        },
        {
          field: "entities.personWorkingPlace_t",
          isChild: true,
          label: "personWorkingPlace",
          type: "list-facet"
        },
        {
          field: "entities.personOccupation_t",
          isChild: true,
          label: "personOccupation",
          type: "list-facet"
        },
        {
          field: "entities.personRole_s",
          isChild: true,
          label: "personRole",
          type: "list-facet"
        },
        {
          field: "entities.personGender_s",
          isChild: true,
          label: "personGender",
          type: "list-facet"
        },
        {
          field: "entities.personAlternateNames_ss",
          isChild: true,
          label: "personAlternateNames",
          type: "list-facet"
        },
        {
          field: "_root_",
          label: "root",
          type: "text"
        },
      ],
      sortFields: [
        {
          field: "entstehungsort_s.keyword",
          label: "originPlace",
          order: "asc"
        },
        {
          field: "titel_t.keyword",
          label: "title",
          order: "asc"
        },
        {
          field: "status_t.keyword",
          label: "status",
          order: "asc"
        },
      ],
    }
  }
}
