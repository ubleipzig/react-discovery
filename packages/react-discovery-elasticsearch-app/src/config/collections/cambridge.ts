import {IConfig} from "@react-discovery/configuration"

export const cambridge: IConfig = {
  collections: {
    uc2: {
      hitComponents: [
        {
          defaultOption: true,
          expandedView: false,
          hitComponent: "DefaultHitComponent",
          type: "list",
        },
        {
          expandedView: false,
          hitComponent: "GridComponent",
          type: "grid"
        },
      ],
      name: 'Cambridge University',
      primaryTypeField: "collections.keyword",
      refinementListFilters: {
        1: {
          field: "Collection.keyword",
          label: "Collection",
          size: 10
        },
        2: {
          field: "Format.keyword",
          label: "Format",
          size: 10
        },
        3: {
          field: "Origin Place.keyword",
          label: "Origin Place",
          size: 10
        },
      },
      searchFields: [
        {
          field: "_id",
          label: "_id",
          type: null
        },
        {
          field: "Abstract",
          label: "Abstract",
          type: null
        },
        {
          field: "Additions",
          label: "Additions",
          type: null
        },
        {
          field: "Alternative Title(s)",
          label: "Alternative Title(s)",
          type: null
        },
        {
          field: "Associated Person(s)",
          label: "Associated Person(s)",
          type: null
        },
        {
          field: "Associated Place(s)",
          label: "Associated Place(s)",
          type: null
        },
        {
          field: "Associated Organisation(s)",
          label: "Associated Organisation(s)",
          type: null
        },
        {
          field: "Author(s)",
          label: "Author(s)",
          type: null
        },
        {
          field: "Author(s) of the Record",
          label: "Author(s) of the Record",
          type: null
        },
        {
          field: "Bibliography",
          label: "Bibliography",
          type: null
        },
        {
          field: "Binding",
          label: "Binding",
          type: null
        },
        {
          field: "Classmark",
          label: "Classmark",
          type: null
        },
        {
          field: "Collation",
          label: "Collation",
          type: null
        },
        {
          field: "Collection",
          label: "Collection",
          type: null
        },
        {
          field: "Condition",
          label: "Condition",
          type: null
        },
        {
          field: "Creator(s)",
          label: "Creator(s)",
          type: null
        },
        {
          field: "Data Source(s)",
          label: "Data Source(s)",
          type: null
        },
        {
          field: "Date of Acquisition",
          label: "Date of Acquisition",
          type: null
        },
        {
          field: "Date of Creation",
          label: "Date of Creation",
          type: null
        },
        {
          field: "Date of Publication",
          label: "Date of Publication",
          type: null
        },
        {
          field: "Decoration",
          label: "Decoration",
          type: null
        },
        {
          field: "Descriptive Title(s)",
          label: "Descriptive Title(s)",
          type: null
        },
        {
          field: "Donor(s)",
          label: "Donor(s)",
          type: null
        },
        {
          field: "Excerpts",
          label: "Excerpts",
          type: null
        },
        {
          field: "Extent",
          label: "Extent",
          type: null
        },
        {
          field: "Featured in",
          label: "Featured in",
          type: null
        },
        {
          field: "Filiations",
          label: "Filiations",
          type: null
        },
        {
          field: "Foliation",
          label: "Foliation",
          type: null
        },
        {
          field: "Format",
          label: "Format",
          type: null
        },
        {
          field: "Former Owner(s)",
          label: "Former Owner(s)",
          type: null
        },
        {
          field: "Funding",
          label: "Funding",
          type: null
        },
        {
          field: "Language(s)",
          label: "Language(s)",
          type: null
        },
        {
          field: "Layout",
          label: "Layout",
          type: null
        },
        {
          field: "Level of Description",
          label: "Level of Description",
          type: null
        },
        {
          field: "Manifest",
          label: "Manifest",
          type: null
        },
        {
          field: "Material",
          label: "Material",
          type: null
        },
        {
          field: "Music notation",
          label: "Music notation",
          type: null
        },
        {
          field: "Note(s)",
          label: "Note(s)",
          type: null
        },
        {
          field: "Origin Place",
          label: "Origin Place",
          type: null
        },
        {
          field: "Physical Description",
          label: "Physical Description",
          type: null
        },
        {
          field: "Place of Publication",
          label: "Place of Publication",
          type: null
        },
        {
          field: "Provenance",
          label: "Provenance",
          type: null
        },
        {
          field: "Publisher",
          label: "Publisher",
          type: null
        },
        {
          field: "Recipient(s)",
          label: "Recipient(s)",
          type: null
        },
        {
          field: "Scribe(s)",
          label: "Scribe(s)",
          type: null
        },
        {
          field: "Script",
          label: "Script",
          type: null
        },
        {
          field: "seeAlso",
          label: "seeAlso",
          type: null
        },
        {
          field: "Subject(s)",
          label: "Subject(s)",
          type: null
        },
        {
          field: "Support",
          label: "Support",
          type: null
        },
        {
          field: "thumbnail",
          label: "thumbnail",
          type: null
        },
        {
          field: "title",
          label: "title",
          type: null
        },
        {
          field: "Title",
          label: "Title",
          type: null
        },
        {
          field: "Uniform Title",
          label: "Uniform Title",
          type: null
        }
      ],
      sortFields: [
        {
          field: "Title.keyword",
          label: "Title",
          order: "asc"
        },
        {
          field: "Author(s).keyword",
          label: "Author(s)",
          order: "asc"
        },
        {
          field: "Subject(s).keyword",
          label: "Subject(s)",
          order: "desc"
        }
      ],
    }
  }
}

