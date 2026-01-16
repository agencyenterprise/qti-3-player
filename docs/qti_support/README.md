# QTI 3.0 Item Profile - Element Support Checklist

This document lists all QTI 3.0 elements, their attributes, and child elements based on the XSD schema.

**Source**: [QTI 3.0 Item Profile XSD](https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_itemv3p0p1_v1p0.xsd)

## Table of Contents

- [QTI-Specific Elements](#qti-specific-elements)
- [Custom Types](#custom-types)
  - [Simple Types](#simple-types)
  - [Complex Types](#complex-types)

<a name="qti-specific-elements"></a>

## QTI-Specific Elements

<a name="el-qti-and"></a>

### [ ] `qti-and`

  **Attributes:** None

---

<a name="el-qti-any-n"></a>

### [ ] `qti-any-n`

  **Attributes:**
  - [ ] `max`
    - Type: `integer`
    - Use: `required`

  - [ ] `min`
    - Type: `integer`
    - Use: `required`

---

<a name="el-qti-area-map-entry"></a>

### [ ] `qti-area-map-entry`

  **Attributes:**
  - [ ] `coords`
    - Type: `xs:normalizedString`
    - Use: `required`
    - Pattern: `(([0-9]+%?[,]){2}([0-9]+%?))|(([0-9]+%?[,]){3}([0-9]+%?))|(([0-9]+%?[,]){2}(([0-9]+%?[,]){2})+([0-9]+%?[,])([0-9]+%?))`

  - [ ] `mapped-value`
    - Type: `double`
    - Use: `required`

  - [ ] `shape`
    - Type: `string`
    - Use: `required`
    - Allowed values: `circle`, `default`, `ellipse`, `poly`, `rect`

---

<a name="el-qti-area-mapping"></a>

### [ ] `qti-area-mapping`

  **Attributes:**
  - [ ] `default-value`
    - Type: `double`
    - Use: `optional`
    - Default: `0`

  - [ ] `lower-bound`
    - Type: `double`
    - Use: `optional`

  - [ ] `upper-bound`
    - Type: `double`
    - Use: `optional`

---

<a name="el-qti-assessment-item"></a>

### [ ] `qti-assessment-item`

  **Attributes:**
  - [ ] `adaptive`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `time-dependent`
    - Type: `boolean`
    - Use: `required`

  - [ ] `title`
    - Type: `normalizedString`
    - Use: `required`

  - [ ] `tool-name`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `tool-version`
    - Type: `normalizedString`
    - Use: `optional`

---

<a name="el-qti-assessment-stimulus-ref"></a>

### [ ] `qti-assessment-stimulus-ref`

  **Attributes:**
  - [ ] `href`
    - Type: `anyURI`
    - Use: `required`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `title`
    - Type: `normalizedString`
    - Use: `optional`

---

<a name="el-qti-associable-hotspot"></a>

### [ ] `qti-associable-hotspot`

  **Attributes:**
  - [ ] `coords`
    - Type: `xs:normalizedString`
    - Use: `required`
    - Pattern: `(([0-9]+%?[,]){2}([0-9]+%?))|(([0-9]+%?[,]){3}([0-9]+%?))|(([0-9]+%?[,]){2}(([0-9]+%?[,]){2})+([0-9]+%?[,])([0-9]+%?))`

  - [ ] `hotspot-label`
    - Type: `string`
    - Use: `optional`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `match-group`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `match-max`
    - Type: `nonNegativeInteger`
    - Use: `required`

  - [ ] `match-min`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `shape`
    - Type: `string`
    - Use: `required`
    - Allowed values: `circle`, `default`, `ellipse`, `poly`, `rect`

  - [ ] `show-hide`
    - Type: `string`
    - Use: `optional`
    - Default: `show`
    - Allowed values: `show`, `hide`

  - [ ] `template-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-associate-interaction"></a>

### [ ] `qti-associate-interaction`

  **Attributes:**
  - [ ] `max-associations`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `1`

  - [ ] `min-associations`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `shuffle`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

---

<a name="el-qti-base-value"></a>

### [ ] `qti-base-value`

  **Attributes:**
  - [ ] `base-type`
    - Type: `string`
    - Use: `required`
    - Allowed values: `boolean`, `directedPair`, `duration`, `file`, `float`, `identifier`, `integer`, `pair`, `point`, `string`, `uri`

---

<a name="el-qti-calculator"></a>

### [ ] `qti-calculator`

  **Attributes:** None

---

<a name="el-qti-calculator-info"></a>

### [ ] `qti-calculator-info`

  **Attributes:**
  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `mime-type`
    - Type: `xs:normalizedString`
    - Use: `optional`
    - Pattern: `[\p{IsBasicLatin}-[()<>@,;:\\"/\[\]?=]]+/[\p{IsBasicLatin}-[()<>@,;:\\"/\[\]?=]]+`

---

<a name="el-qti-calculator-type"></a>

### [ ] `qti-calculator-type`

  **Attributes:** None

---

<a name="el-qti-card"></a>

### [ ] `qti-card`

  **Attributes:**
  - [ ] `support`
    - Type: [`SupportExtStringDType`](#type-supportextstringdtype)
    - Use: `required`

---

<a name="el-qti-card-entry"></a>

### [ ] `qti-card-entry`

  **Attributes:**
  - [ ] `default`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

---

<a name="el-qti-catalog"></a>

### [ ] `qti-catalog`

  **Attributes:**
  - [ ] `id`
    - Type: `xs:ID`
    - Use: `required`

---

<a name="el-qti-catalog-info"></a>

### [ ] `qti-catalog-info`

  **Attributes:** None

---

<a name="el-qti-choice-interaction"></a>

### [ ] `qti-choice-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-max-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-min-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `max-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `1`

  - [ ] `min-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `vertical`
    - Allowed values: `horizontal`, `vertical`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `shuffle`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

---

<a name="el-qti-companion-materials-info"></a>

### [ ] `qti-companion-materials-info`

  **Attributes:** None

---

<a name="el-qti-container-size"></a>

### [ ] `qti-container-size`

  **Attributes:** None

---

<a name="el-qti-contains"></a>

### [ ] `qti-contains`

  **Attributes:** None

---

<a name="el-qti-content-body"></a>

### [ ] `qti-content-body`

  **Attributes:** None

---

<a name="el-qti-context-declaration"></a>

### [ ] `qti-context-declaration`

  **Attributes:**
  - [ ] `base-type`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `boolean`, `directedPair`, `duration`, `file`, `float`, `identifier`, `integer`, `pair`, `point`, `string`, `uri`

  - [ ] `cardinality`
    - Type: `string`
    - Use: `required`
    - Allowed values: `multiple`, `ordered`, `record`, `single`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-context-variable"></a>

### [ ] `qti-context-variable`

  **Attributes:**
  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-correct"></a>

### [ ] `qti-correct`

  **Attributes:**
  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-correct-response"></a>

### [ ] `qti-correct-response`

  **Attributes:**
  - [ ] `interpretation`
    - Type: `string`
    - Use: `optional`

---

<a name="el-qti-custom-interaction"></a>

### [ ] `qti-custom-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

---

<a name="el-qti-custom-operator"></a>

### [ ] `qti-custom-operator`

  **Attributes:**
  - [ ] `class`
    - Type: `xs:NCName`
    - Use: `optional`

  - [ ] `definition`
    - Type: `anyURI`
    - Use: `optional`

---

<a name="el-qti-default"></a>

### [ ] `qti-default`

  **Attributes:**
  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-default-value"></a>

### [ ] `qti-default-value`

  **Attributes:**
  - [ ] `interpretation`
    - Type: `normalizedString`
    - Use: `optional`

---

<a name="el-qti-delete"></a>

### [ ] `qti-delete`

  **Attributes:** None

---

<a name="el-qti-description"></a>

### [ ] `qti-description`

  **Attributes:** None

---

<a name="el-qti-digital-material"></a>

### [ ] `qti-digital-material`

  **Attributes:**
  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `mime-type`
    - Type: `xs:normalizedString`
    - Use: `optional`
    - Pattern: `[\p{IsBasicLatin}-[()<>@,;:\\"/\[\]?=]]+/[\p{IsBasicLatin}-[()<>@,;:\\"/\[\]?=]]+`

---

<a name="el-qti-divide"></a>

### [ ] `qti-divide`

  **Attributes:** None

---

<a name="el-qti-drawing-interaction"></a>

### [ ] `qti-drawing-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

---

<a name="el-qti-duration-gte"></a>

### [ ] `qti-duration-gte`

  **Attributes:** None

---

<a name="el-qti-duration-lt"></a>

### [ ] `qti-duration-lt`

  **Attributes:** None

---

<a name="el-qti-end-attempt-interaction"></a>

### [ ] `qti-end-attempt-interaction`

  **Attributes:**
  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `count-attempt`
    - Type: `boolean`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `title`
    - Type: `string`
    - Use: `required`

---

<a name="el-qti-equal"></a>

### [ ] `qti-equal`

  **Attributes:**
  - [ ] `include-lower-bound`
    - Type: `boolean`
    - Use: `optional`
    - Default: `true`

  - [ ] `include-upper-bound`
    - Type: `boolean`
    - Use: `optional`
    - Default: `true`

  - [ ] `tolerance`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `tolerance-mode`
    - Type: `string`
    - Use: `optional`
    - Default: `exact`
    - Allowed values: `absolute`, `exact`, `relative`

---

<a name="el-qti-equal-rounded"></a>

### [ ] `qti-equal-rounded`

  **Attributes:**
  - [ ] `figures`
    - Type: `integer`
    - Use: `required`

  - [ ] `rounding-mode`
    - Type: `string`
    - Use: `optional`
    - Default: `significantFigures`
    - Allowed values: `decimalPlaces`, `significantFigures`

---

<a name="el-qti-exit-response"></a>

### [ ] `qti-exit-response`

  **Attributes:** None

---

<a name="el-qti-exit-template"></a>

### [ ] `qti-exit-template`

  **Attributes:** None

---

<a name="el-qti-extended-text-interaction"></a>

### [ ] `qti-extended-text-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `base`
    - Type: `int`
    - Use: `optional`
    - Default: `10`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-patternmask-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `expected-length`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `expected-lines`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `format`
    - Type: `string`
    - Use: `optional`
    - Default: `plain`
    - Allowed values: `plain`, `preformatted`, `xhtml`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `max-strings`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `min-strings`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `pattern-mask`
    - Type: `string`
    - Use: `optional`

  - [ ] `placeholder-text`
    - Type: `string`
    - Use: `optional`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `string-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-feedback-block"></a>

### [ ] `qti-feedback-block`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `data-ssml`
    - Type: `string`
    - Use: `optional`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `outcome-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `show-hide`
    - Type: `string`
    - Use: `optional`
    - Default: `show`
    - Allowed values: `show`, `hide`

---

<a name="el-qti-feedback-inline"></a>

### [ ] `qti-feedback-inline`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `data-ssml`
    - Type: `string`
    - Use: `optional`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `outcome-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `show-hide`
    - Type: `string`
    - Use: `optional`
    - Default: `show`
    - Allowed values: `show`, `hide`

---

<a name="el-qti-field-value"></a>

### [ ] `qti-field-value`

  **Attributes:**
  - [ ] `field-identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-file-href"></a>

### [ ] `qti-file-href`

  **Attributes:** None

---

<a name="el-qti-gap"></a>

### [ ] `qti-gap`

  **Attributes:**
  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `match-group`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `show-hide`
    - Type: `string`
    - Use: `optional`
    - Default: `show`
    - Allowed values: `show`, `hide`

  - [ ] `template-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-gap-img"></a>

### [ ] `qti-gap-img`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `left`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `match-group`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `match-max`
    - Type: `nonNegativeInteger`
    - Use: `required`

  - [ ] `match-min`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `object-label`
    - Type: `string`
    - Use: `optional`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `show-hide`
    - Type: `string`
    - Use: `optional`
    - Default: `show`
    - Allowed values: `show`, `hide`

  - [ ] `template-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

  - [ ] `top`
    - Type: `normalizedString`
    - Use: `optional`

---

<a name="el-qti-gap-match-interaction"></a>

### [ ] `qti-gap-match-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-choices-container-width`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `data-max-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-min-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `max-associations`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `1`

  - [ ] `min-associations`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `shuffle`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

---

<a name="el-qti-gap-text"></a>

### [ ] `qti-gap-text`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `match-group`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `match-max`
    - Type: `nonNegativeInteger`
    - Use: `required`

  - [ ] `match-min`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `show-hide`
    - Type: `string`
    - Use: `optional`
    - Default: `show`
    - Allowed values: `show`, `hide`

  - [ ] `template-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-gcd"></a>

### [ ] `qti-gcd`

  **Attributes:** None

---

<a name="el-qti-graphic-associate-interaction"></a>

### [ ] `qti-graphic-associate-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `max-associations`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `1`

  - [ ] `min-associations`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

---

<a name="el-qti-graphic-gap-match-interaction"></a>

### [ ] `qti-graphic-gap-match-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-choices-container-width`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `data-max-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-min-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `max-associations`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `1`

  - [ ] `min-associations`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

---

<a name="el-qti-graphic-order-interaction"></a>

### [ ] `qti-graphic-order-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `max-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `min-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

---

<a name="el-qti-gt"></a>

### [ ] `qti-gt`

  **Attributes:** None

---

<a name="el-qti-gte"></a>

### [ ] `qti-gte`

  **Attributes:** None

---

<a name="el-qti-hotspot-choice"></a>

### [ ] `qti-hotspot-choice`

  **Attributes:**
  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `coords`
    - Type: `xs:normalizedString`
    - Use: `required`
    - Pattern: `(([0-9]+%?[,]){2}([0-9]+%?))|(([0-9]+%?[,]){3}([0-9]+%?))|(([0-9]+%?[,]){2}(([0-9]+%?[,]){2})+([0-9]+%?[,])([0-9]+%?))`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `hotspot-label`
    - Type: `string`
    - Use: `optional`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `shape`
    - Type: `string`
    - Use: `required`
    - Allowed values: `circle`, `default`, `ellipse`, `poly`, `rect`

  - [ ] `show-hide`
    - Type: `string`
    - Use: `optional`
    - Default: `show`
    - Allowed values: `show`, `hide`

  - [ ] `template-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-hotspot-interaction"></a>

### [ ] `qti-hotspot-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-max-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-min-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `max-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `1`

  - [ ] `min-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

---

<a name="el-qti-hottext"></a>

### [ ] `qti-hottext`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `data-ssml`
    - Type: `string`
    - Use: `optional`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `show-hide`
    - Type: `string`
    - Use: `optional`
    - Default: `show`
    - Allowed values: `show`, `hide`

  - [ ] `template-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-hottext-interaction"></a>

### [ ] `qti-hottext-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-max-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-min-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `max-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `1`

  - [ ] `min-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

---

<a name="el-qti-html-content"></a>

### [ ] `qti-html-content`

  **Attributes:** None

---

<a name="el-qti-increment-si"></a>

### [ ] `qti-increment-si`

  **Attributes:** None

---

<a name="el-qti-increment-us"></a>

### [ ] `qti-increment-us`

  **Attributes:** None

---

<a name="el-qti-index"></a>

### [ ] `qti-index`

  **Attributes:**
  - [ ] `n`
    - Type: `NCName`
    - Use: `required`

---

<a name="el-qti-inline-choice"></a>

### [ ] `qti-inline-choice`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `fixed`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `show-hide`
    - Type: `string`
    - Use: `optional`
    - Default: `show`
    - Allowed values: `show`, `hide`

  - [ ] `template-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-inline-choice-interaction"></a>

### [ ] `qti-inline-choice-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-min-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-prompt`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `min-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `shuffle`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

---

<a name="el-qti-inside"></a>

### [ ] `qti-inside`

  **Attributes:**
  - [ ] `coords`
    - Type: `xs:normalizedString`
    - Use: `required`
    - Pattern: `(([0-9]+%?[,]){2}([0-9]+%?))|(([0-9]+%?[,]){3}([0-9]+%?))|(([0-9]+%?[,]){2}(([0-9]+%?[,]){2})+([0-9]+%?[,])([0-9]+%?))`

  - [ ] `shape`
    - Type: `string`
    - Use: `required`
    - Allowed values: `circle`, `default`, `ellipse`, `poly`, `rect`

---

<a name="el-qti-integer-divide"></a>

### [ ] `qti-integer-divide`

  **Attributes:** None

---

<a name="el-qti-integer-modulus"></a>

### [ ] `qti-integer-modulus`

  **Attributes:** None

---

<a name="el-qti-integer-to-float"></a>

### [ ] `qti-integer-to-float`

  **Attributes:** None

---

<a name="el-qti-interaction-markup"></a>

### [ ] `qti-interaction-markup`

  **Attributes:** None

---

<a name="el-qti-interaction-module"></a>

### [ ] `qti-interaction-module`

  **Attributes:**
  - [ ] `fallback-path`
    - Type: `anyURI`
    - Use: `optional`

  - [ ] `id`
    - Type: `NCName`
    - Use: `required`

  - [ ] `primary-path`
    - Type: `anyURI`
    - Use: `optional`

---

<a name="el-qti-interaction-modules"></a>

### [ ] `qti-interaction-modules`

  **Attributes:**
  - [ ] `primary-configuration`
    - Type: `anyURI`
    - Use: `optional`
    - Default: `modules/module_resolution.js`

  - [ ] `secondary-configuration`
    - Type: `anyURI`
    - Use: `optional`
    - Default: `modules/fallback_module_resolution.js`

---

<a name="el-qti-interpolation-table"></a>

### [ ] `qti-interpolation-table`

  **Attributes:**
  - [ ] `default-value`
    - Type: `string`
    - Use: `optional`

---

<a name="el-qti-interpolation-table-entry"></a>

### [ ] `qti-interpolation-table-entry`

  **Attributes:**
  - [ ] `include-boundary`
    - Type: `boolean`
    - Use: `optional`
    - Default: `true`

  - [ ] `source-value`
    - Type: `double`
    - Use: `required`

  - [ ] `target-value`
    - Type: `string`
    - Use: `required`

---

<a name="el-qti-is-null"></a>

### [ ] `qti-is-null`

  **Attributes:** None

---

<a name="el-qti-item-body"></a>

### [ ] `qti-item-body`

  **Attributes:**
  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

---

<a name="el-qti-label"></a>

### [ ] `qti-label`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `data-ssml`
    - Type: `string`
    - Use: `optional`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

---

<a name="el-qti-lcm"></a>

### [ ] `qti-lcm`

  **Attributes:** None

---

<a name="el-qti-lookup-outcome-value"></a>

### [ ] `qti-lookup-outcome-value`

  **Attributes:**
  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-lt"></a>

### [ ] `qti-lt`

  **Attributes:** None

---

<a name="el-qti-lte"></a>

### [ ] `qti-lte`

  **Attributes:** None

---

<a name="el-qti-major-increment"></a>

### [ ] `qti-major-increment`

  **Attributes:**
  - [ ] `unit`
    - Type: `string`
    - Use: `required`
    - Allowed values: `Inch`, `Foot`, `Yard`, `Mile`

---

<a name="el-qti-map-entry"></a>

### [ ] `qti-map-entry`

  **Attributes:**
  - [ ] `case-sensitive`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `map-key`
    - Type: `normalizedString`
    - Use: `required`

  - [ ] `mapped-value`
    - Type: `double`
    - Use: `required`

---

<a name="el-qti-map-response"></a>

### [ ] `qti-map-response`

  **Attributes:**
  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-map-response-point"></a>

### [ ] `qti-map-response-point`

  **Attributes:**
  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-mapping"></a>

### [ ] `qti-mapping`

  **Attributes:**
  - [ ] `default-value`
    - Type: `double`
    - Use: `optional`
    - Default: `0`

  - [ ] `lower-bound`
    - Type: `double`
    - Use: `optional`

  - [ ] `upper-bound`
    - Type: `double`
    - Use: `optional`

---

<a name="el-qti-match"></a>

### [ ] `qti-match`

  **Attributes:** None

---

<a name="el-qti-match-interaction"></a>

### [ ] `qti-match-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-first-column-header`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-max-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-min-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `max-associations`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `1`

  - [ ] `min-associations`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `shuffle`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

---

<a name="el-qti-match-table"></a>

### [ ] `qti-match-table`

  **Attributes:**
  - [ ] `default-value`
    - Type: `string`
    - Use: `optional`

---

<a name="el-qti-match-table-entry"></a>

### [ ] `qti-match-table-entry`

  **Attributes:**
  - [ ] `source-value`
    - Type: `int`
    - Use: `required`

  - [ ] `target-value`
    - Type: `string`
    - Use: `required`
    - Allowed values: `boolean`, `directedPair`, `duration`, `file`, `float`, `identifier`, `integer`, `pair`, `point`, `string`, `uri`

---

<a name="el-qti-math-constant"></a>

### [ ] `qti-math-constant`

  **Attributes:**
  - [ ] `name`
    - Type: `string`
    - Use: `required`
    - Allowed values: `pi`, `e`

---

<a name="el-qti-math-operator"></a>

### [ ] `qti-math-operator`

  **Attributes:**
  - [ ] `name`
    - Type: `string`
    - Use: `required`
    - Allowed values: `sin`, `cos`, `tan`, `sec`, `csc`, `cot`, `asin`, `acos`, `atan`, `atan2`, `asec`, `acsc`, `acot`, `sinh`, `cosh`, `tanh`, `sech`, `csch`, `coth`, `log`, `ln`, `exp`, `abs`, `signum`, `floor`, `ceil`, `toDegrees`, `toRadians`

---

<a name="el-qti-max"></a>

### [ ] `qti-max`

  **Attributes:** None

---

<a name="el-qti-media-interaction"></a>

### [ ] `qti-media-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `autostart`
    - Type: `boolean`
    - Use: `required`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `coords`
    - Type: `xs:normalizedString`
    - Use: `optional`
    - Pattern: `(([0-9]+%?[,]){2}([0-9]+%?))|(([0-9]+%?[,]){3}([0-9]+%?))|(([0-9]+%?[,]){2}(([0-9]+%?[,]){2})+([0-9]+%?[,])([0-9]+%?))`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `loop`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `max-plays`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `min-plays`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

---

<a name="el-qti-member"></a>

### [ ] `qti-member`

  **Attributes:** None

---

<a name="el-qti-min"></a>

### [ ] `qti-min`

  **Attributes:** None

---

<a name="el-qti-minimum-length"></a>

### [ ] `qti-minimum-length`

  **Attributes:** None

---

<a name="el-qti-minor-increment"></a>

### [ ] `qti-minor-increment`

  **Attributes:**
  - [ ] `unit`
    - Type: `string`
    - Use: `required`
    - Allowed values: `Inch`, `Foot`, `Yard`, `Mile`

---

<a name="el-qti-modal-feedback"></a>

### [ ] `qti-modal-feedback`

  **Attributes:**
  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `outcome-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `show-hide`
    - Type: `string`
    - Use: `required`
    - Allowed values: `show`, `hide`

  - [ ] `title`
    - Type: `normalizedString`
    - Use: `optional`

---

<a name="el-qti-multiple"></a>

### [ ] `qti-multiple`

  **Attributes:** None

---

<a name="el-qti-not"></a>

### [ ] `qti-not`

  **Attributes:** None

---

<a name="el-qti-null"></a>

### [ ] `qti-null`

  **Attributes:** None

---

<a name="el-qti-number-correct"></a>

### [ ] `qti-number-correct`

  **Attributes:**
  - [ ] `exclude-category`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `include-category`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `section-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-number-incorrect"></a>

### [ ] `qti-number-incorrect`

  **Attributes:**
  - [ ] `exclude-category`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `include-category`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `section-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-number-presented"></a>

### [ ] `qti-number-presented`

  **Attributes:**
  - [ ] `exclude-category`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `include-category`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `section-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-number-responded"></a>

### [ ] `qti-number-responded`

  **Attributes:**
  - [ ] `exclude-category`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `include-category`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `section-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-number-selected"></a>

### [ ] `qti-number-selected`

  **Attributes:**
  - [ ] `exclude-category`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `include-category`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `section-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-or"></a>

### [ ] `qti-or`

  **Attributes:** None

---

<a name="el-qti-order-interaction"></a>

### [ ] `qti-order-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-choices-container-width`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `data-max-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-min-selections-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `max-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `min-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `orientation`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `horizontal`, `vertical`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `shuffle`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

---

<a name="el-qti-ordered"></a>

### [ ] `qti-ordered`

  **Attributes:** None

---

<a name="el-qti-outcome-declaration"></a>

### [ ] `qti-outcome-declaration`

  **Attributes:**
  - [ ] `base-type`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `boolean`, `directedPair`, `duration`, `file`, `float`, `identifier`, `integer`, `pair`, `point`, `string`, `uri`

  - [ ] `cardinality`
    - Type: `string`
    - Use: `required`
    - Allowed values: `multiple`, `ordered`, `record`, `single`

  - [ ] `external-scored`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `externalMachine`, `human`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `interpretation`
    - Type: `string`
    - Use: `optional`

  - [ ] `long-interpretation`
    - Type: `anyURI`
    - Use: `optional`

  - [ ] `mastery-value`
    - Type: `double`
    - Use: `optional`

  - [ ] `normal-maximum`
    - Type: `xs:double`
    - Use: `optional`
    - minInclusive: `0.0`

  - [ ] `normal-minimum`
    - Type: `double`
    - Use: `optional`
    - Default: `0.0`

  - [ ] `variable-identifier-ref`
    - Type: `xs:IDREF`
    - Use: `optional`

  - [ ] `view`
    - Type: `unknown`
    - Use: `optional`

---

<a name="el-qti-outcome-maximum"></a>

### [ ] `qti-outcome-maximum`

  **Attributes:**
  - [ ] `exclude-category`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `include-category`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `outcome-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `section-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

  - [ ] `weight-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-outcome-minimum"></a>

### [ ] `qti-outcome-minimum`

  **Attributes:**
  - [ ] `exclude-category`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `include-category`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `outcome-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `section-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

  - [ ] `weight-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-pattern-match"></a>

### [ ] `qti-pattern-match`

  **Attributes:**
  - [ ] `pattern`
    - Type: `string`
    - Use: `required`

---

<a name="el-qti-physical-material"></a>

### [ ] `qti-physical-material`

  **Attributes:** None

---

<a name="el-qti-portable-custom-interaction"></a>

### [ ] `qti-portable-custom-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `custom-interaction-type-identifier`
    - Type: `anyURI`
    - Use: `required`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `module`
    - Type: `NCName`
    - Use: `optional`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

---

<a name="el-qti-position-object-interaction"></a>

### [ ] `qti-position-object-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `center-point`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `max-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `1`

  - [ ] `min-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

---

<a name="el-qti-position-object-stage"></a>

### [ ] `qti-position-object-stage`

  **Attributes:**
  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

---

<a name="el-qti-power"></a>

### [ ] `qti-power`

  **Attributes:** None

---

<a name="el-qti-printed-variable"></a>

### [ ] `qti-printed-variable`

  **Attributes:**
  - [ ] `base`
    - Type: `integer`
    - Use: `optional`
    - Default: `10`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `delimiter`
    - Type: `normalizedString`
    - Use: `optional`
    - Default: `;`

  - [ ] `field`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `format`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `index`
    - Type: `integer`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `mapping-indicator`
    - Type: `normalizedString`
    - Use: `optional`
    - Default: `=`

  - [ ] `power-form`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

---

<a name="el-qti-product"></a>

### [ ] `qti-product`

  **Attributes:** None

---

<a name="el-qti-prompt"></a>

### [ ] `qti-prompt`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

---

<a name="el-qti-protractor"></a>

### [ ] `qti-protractor`

  **Attributes:** None

---

<a name="el-qti-random"></a>

### [ ] `qti-random`

  **Attributes:** None

---

<a name="el-qti-random-float"></a>

### [ ] `qti-random-float`

  **Attributes:**
  - [ ] `max`
    - Type: `double`
    - Use: `required`

  - [ ] `min`
    - Type: `double`
    - Use: `optional`
    - Default: `0`

---

<a name="el-qti-random-integer"></a>

### [ ] `qti-random-integer`

  **Attributes:**
  - [ ] `max`
    - Type: `integer`
    - Use: `required`

  - [ ] `min`
    - Type: `integer`
    - Use: `optional`
    - Default: `0`

  - [ ] `step`
    - Type: `integer`
    - Use: `optional`
    - Default: `1`

---

<a name="el-qti-repeat"></a>

### [ ] `qti-repeat`

  **Attributes:**
  - [ ] `number-repeats`
    - Type: `NCName`
    - Use: `required`

---

<a name="el-qti-resource-icon"></a>

### [ ] `qti-resource-icon`

  **Attributes:** None

---

<a name="el-qti-response-condition"></a>

### [ ] `qti-response-condition`

  **Attributes:** None

---

<a name="el-qti-response-declaration"></a>

### [ ] `qti-response-declaration`

  **Attributes:**
  - [ ] `base-type`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `boolean`, `directedPair`, `duration`, `file`, `float`, `identifier`, `integer`, `pair`, `point`, `string`, `uri`

  - [ ] `cardinality`
    - Type: `string`
    - Use: `required`
    - Allowed values: `multiple`, `ordered`, `record`, `single`

  - [ ] `identifier`
    - Type: `xs:ID`
    - Use: `required`

---

<a name="el-qti-response-else"></a>

### [ ] `qti-response-else`

  **Attributes:** None

---

<a name="el-qti-response-else-if"></a>

### [ ] `qti-response-else-if`

  **Attributes:** None

---

<a name="el-qti-response-if"></a>

### [ ] `qti-response-if`

  **Attributes:** None

---

<a name="el-qti-response-processing"></a>

### [ ] `qti-response-processing`

  **Attributes:**
  - [ ] `template`
    - Type: `anyURI`
    - Use: `optional`

  - [ ] `template-location`
    - Type: `anyURI`
    - Use: `optional`

---

<a name="el-qti-response-processing-fragment"></a>

### [ ] `qti-response-processing-fragment`

  **Attributes:** None

---

<a name="el-qti-round"></a>

### [ ] `qti-round`

  **Attributes:** None

---

<a name="el-qti-round-to"></a>

### [ ] `qti-round-to`

  **Attributes:**
  - [ ] `figures`
    - Type: `integer`
    - Use: `required`

  - [ ] `rounding-mode`
    - Type: `string`
    - Use: `required`
    - Allowed values: `decimalPlaces`, `significantFigures`

---

<a name="el-qti-rubric-block"></a>

### [ ] `qti-rubric-block`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `data-ssml`
    - Type: `string`
    - Use: `optional`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `use`
    - Type: [`UseExtensionStringDType`](#type-useextensionstringdtype)
    - Use: `required`

  - [ ] `view`
    - Type: `unknown`
    - Use: `required`

---

<a name="el-qti-rule"></a>

### [ ] `qti-rule`

  **Attributes:** None

---

<a name="el-qti-rule-system-si"></a>

### [ ] `qti-rule-system-si`

  **Attributes:** None

---

<a name="el-qti-rule-system-us"></a>

### [ ] `qti-rule-system-us`

  **Attributes:** None

---

<a name="el-qti-select-point-interaction"></a>

### [ ] `qti-select-point-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `max-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `min-choices`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

---

<a name="el-qti-set-correct-response"></a>

### [ ] `qti-set-correct-response`

  **Attributes:**
  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-set-default-value"></a>

### [ ] `qti-set-default-value`

  **Attributes:**
  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-set-outcome-value"></a>

### [ ] `qti-set-outcome-value`

  **Attributes:**
  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-set-template-value"></a>

### [ ] `qti-set-template-value`

  **Attributes:**
  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-simple-associable-choice"></a>

### [ ] `qti-simple-associable-choice`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `fixed`
    - Type: `boolean`
    - Use: `optional`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `match-group`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `match-max`
    - Type: `nonNegativeInteger`
    - Use: `required`

  - [ ] `match-min`
    - Type: `nonNegativeInteger`
    - Use: `optional`
    - Default: `0`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `show-hide`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `show`, `hide`

  - [ ] `template-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-simple-choice"></a>

### [ ] `qti-simple-choice`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `fixed`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `show-hide`
    - Type: `string`
    - Use: `optional`
    - Default: `show`
    - Allowed values: `show`, `hide`

  - [ ] `template-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-simple-match-set"></a>

### [ ] `qti-simple-match-set`

  **Attributes:**
  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

---

<a name="el-qti-slider-interaction"></a>

### [ ] `qti-slider-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lower-bound`
    - Type: `xs:double`
    - Use: `required`
    - minInclusive: `0.0`

  - [ ] `orientation`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `horizontal`, `vertical`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `reverse`
    - Type: `boolean`
    - Use: `optional`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `step`
    - Type: `xs:double`
    - Use: `optional`
    - Default: `1.0`
    - minInclusive: `0.0`

  - [ ] `step-label`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `upper-bound`
    - Type: `xs:double`
    - Use: `required`
    - minInclusive: `0.0`

---

<a name="el-qti-stats-operator"></a>

### [ ] `qti-stats-operator`

  **Attributes:**
  - [ ] `name`
    - Type: `string`
    - Use: `required`
    - Allowed values: `mean`, `sampleVariance`, `sampleSD`, `popVariance`, `popSD`

---

<a name="el-qti-string-match"></a>

### [ ] `qti-string-match`

  **Attributes:**
  - [ ] `case-sensitive`
    - Type: `boolean`
    - Use: `required`

  - [ ] `substring`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

---

<a name="el-qti-stylesheet"></a>

### [ ] `qti-stylesheet`

  **Attributes:**
  - [ ] `href`
    - Type: `anyURI`
    - Use: `required`

  - [ ] `media`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `title`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `type`
    - Type: `xs:normalizedString`
    - Use: `required`
    - Pattern: `[\p{IsBasicLatin}-[()<>@,;:\\"/\[\]?=]]+/[\p{IsBasicLatin}-[()<>@,;:\\"/\[\]?=]]+`

---

<a name="el-qti-substring"></a>

### [ ] `qti-substring`

  **Attributes:**
  - [ ] `case-sensitive`
    - Type: `boolean`
    - Use: `required`

---

<a name="el-qti-subtract"></a>

### [ ] `qti-subtract`

  **Attributes:** None

---

<a name="el-qti-sum"></a>

### [ ] `qti-sum`

  **Attributes:** None

---

<a name="el-qti-template-block"></a>

### [ ] `qti-template-block`

  **Attributes:**
  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `show-hide`
    - Type: `string`
    - Use: `optional`
    - Default: `show`
    - Allowed values: `show`, `hide`

  - [ ] `template-identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-template-condition"></a>

### [ ] `qti-template-condition`

  **Attributes:** None

---

<a name="el-qti-template-constraint"></a>

### [ ] `qti-template-constraint`

  **Attributes:** None

---

<a name="el-qti-template-declaration"></a>

### [ ] `qti-template-declaration`

  **Attributes:**
  - [ ] `base-type`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `boolean`, `directedPair`, `duration`, `file`, `float`, `identifier`, `integer`, `pair`, `point`, `string`, `uri`

  - [ ] `cardinality`
    - Type: `string`
    - Use: `required`
    - Allowed values: `multiple`, `ordered`, `record`, `single`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `math-variable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `param-variable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

---

<a name="el-qti-template-else"></a>

### [ ] `qti-template-else`

  **Attributes:** None

---

<a name="el-qti-template-else-if"></a>

### [ ] `qti-template-else-if`

  **Attributes:** None

---

<a name="el-qti-template-if"></a>

### [ ] `qti-template-if`

  **Attributes:** None

---

<a name="el-qti-template-inline"></a>

### [ ] `qti-template-inline`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `data-ssml`
    - Type: `string`
    - Use: `optional`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `show-hide`
    - Type: `string`
    - Use: `optional`
    - Default: `show`
    - Allowed values: `show`, `hide`

  - [ ] `template-identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-template-processing"></a>

### [ ] `qti-template-processing`

  **Attributes:** None

---

<a name="el-qti-template-variable"></a>

### [ ] `qti-template-variable`

  **Attributes:**
  - [ ] `template-identifier`
    - Type: `xs:NCName`
    - Use: `required`

---

<a name="el-qti-text-entry-interaction"></a>

### [ ] `qti-text-entry-interaction`

  **Attributes:**
  - [ ] `base`
    - Type: `int`
    - Use: `optional`
    - Default: `10`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-patternmask-message`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `expected-length`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `format`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `pattern-mask`
    - Type: `string`
    - Use: `optional`

  - [ ] `placeholder-text`
    - Type: `string`
    - Use: `optional`

  - [ ] `response-identifier`
    - Type: `xs:IDREF`
    - Use: `required`

  - [ ] `string-identifier`
    - Type: `xs:IDREF`
    - Use: `optional`

---

<a name="el-qti-truncate"></a>

### [ ] `qti-truncate`

  **Attributes:** None

---

<a name="el-qti-upload-interaction"></a>

### [ ] `qti-upload-interaction`

  **Attributes:**
  - [ ] `aria-activedescendant`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-atomic`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-autocomplete`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `inline`, `list`, `both`, `none`

  - [ ] `aria-busy`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-checked`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-colcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-colspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-controls`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-current`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `page`, `step`, `location`, `date`, `time`, `true`, `false`, `undefined`

  - [ ] `aria-describedby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-details`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-disabled`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-errormessage`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `aria-expanded`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-flowto`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-haspopup`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-hidden`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-invalid`
    - Type: `string`
    - Use: `optional`
    - Default: `false`
    - Allowed values: `true`, `false`, `grammar`, `spelling`

  - [ ] `aria-keyshortcuts`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `aria-labelledby`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-level`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-live`
    - Type: `string`
    - Use: `optional`
    - Default: `off`
    - Allowed values: `off`, `polite`, `assertive`

  - [ ] `aria-modal`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiline`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-multiselectable`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-orientation`
    - Type: `string`
    - Use: `optional`
    - Default: `horizontal`
    - Allowed values: `vertical`, `horizontal`

  - [ ] `aria-owns`
    - Type: `IDREFS`
    - Use: `optional`

  - [ ] `aria-placeholder`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-posinset`
    - Type: `xs:integer`
    - Use: `optional`
    - minInclusive: `1`

  - [ ] `aria-pressed`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `mixed`, `undefined`

  - [ ] `aria-readonly`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-relevant`
    - Type: `unknown`
    - Use: `optional`
    - Default: `additions text`

  - [ ] `aria-required`
    - Type: `boolean`
    - Use: `optional`
    - Default: `false`

  - [ ] `aria-roledescription`
    - Type: `string`
    - Use: `optional`

  - [ ] `aria-rowcount`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowindex`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-rowspan`
    - Type: `nonNegativeInteger`
    - Use: `optional`

  - [ ] `aria-selected`
    - Type: `string`
    - Use: `optional`
    - Default: `undefined`
    - Allowed values: `true`, `false`, `undefined`

  - [ ] `aria-setsize`
    - Type: `integer`
    - Use: `optional`

  - [ ] `aria-sort`
    - Type: `string`
    - Use: `optional`
    - Default: `none`
    - Allowed values: `ascending`, `descending`, `none`, `other`

  - [ ] `aria-valuemax`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuemin`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuenow`
    - Type: `decimal`
    - Use: `optional`

  - [ ] `aria-valuetext`
    - Type: `string`
    - Use: `optional`

  - [ ] `class`
    - Type: `unknown`
    - Use: `optional`

  - [ ] `data-catalog-idref`
    - Type: `IDREF`
    - Use: `optional`

  - [ ] `data-qti-suppress-tts`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `computer-read-aloud`, `screen-reader`, `all`

  - [ ] `dir`
    - Type: `string`
    - Use: `optional`
    - Default: `auto`
    - Allowed values: `ltr`, `rtl`, `auto`

  - [ ] `id`
    - Type: `xs:ID`
    - Use: `optional`

  - [ ] `label`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `lang`
    - Type: `normalizedString`
    - Use: `optional`

  - [ ] `response-identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `role`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `article`, `columnheader`, `definition`, `document`, `group`, `heading`, `img`, `list`, `listitem`, `math`, `note`, `presentation`, `region`, `row`, `rowgroup`, `rowheader`, `separator`, `toolbar`, `button`, `checkbox`, `gridcell`, `link`, `log`, `option`, `radio`, `slider`, `spinbutton`, `status`, `tab`, `tabpanel`, `textbox`, `timer`, `listbox`, `radiogroup`, `tablist`, `complementary`, `contentinfo`, `alert`, `alertdialog`, `application`, `banner`, `combobox`, `dialog`, `form`, `grid`, `main`, `marquee`, `menu`, `menubar`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `navigation`, `progressbar`, `scrollbar`, `search`, `tooltip`, `tree`, `treegrid`, `treeitem`, `searchbox`, `switch`, `term`, `figure`, `code`, `time`, `subscript`, `superscript`, `meter`, `generic`, `insertion`, `deletion`, `strong`, `emphasis`

  - [ ] `type`
    - Type: `unknown`
    - Use: `optional`

---

<a name="el-qti-value"></a>

### [ ] `qti-value`

  **Attributes:**
  - [ ] `base-type`
    - Type: `string`
    - Use: `optional`
    - Allowed values: `boolean`, `directedPair`, `duration`, `file`, `float`, `identifier`, `integer`, `pair`, `point`, `string`, `uri`

  - [ ] `field-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

<a name="el-qti-variable"></a>

### [ ] `qti-variable`

  **Attributes:**
  - [ ] `identifier`
    - Type: `xs:NCName`
    - Use: `required`

  - [ ] `weight-identifier`
    - Type: `xs:NCName`
    - Use: `optional`

---

