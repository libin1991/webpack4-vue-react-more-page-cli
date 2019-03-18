import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useToCase from '../index'

describe('useToCase Test', () => {
  afterEach(cleanup)
  test('should use to case', () => {
    const { result } = renderHook(() => useToCase('this is me'))
    expect(result.current[0]).toBe('this is me')
  })
  test('should set camel case', () => {
    const { result } = renderHook(() => useToCase(''))
    const { setCamelCase } = result.current[1]
    act(() => setCamelCase('some-javascript-property'))
    expect(result.current[0]).toBe('someJavascriptProperty')
    act(() => setCamelCase('some_database_field_name'))
    expect(result.current[0]).toBe('someDatabaseFieldName')
    act(() => setCamelCase('Some label that needs to be camelized'))
    expect(result.current[0]).toBe('someLabelThatNeedsToBeCamelized')
    act(() => setCamelCase('some-mixed_string with spaces_underscores-and-hyphens'))
    expect(result.current[0]).toBe('someMixedStringWithSpacesUnderscoresAndHyphens')
  })
  test('should set kebab case', () => {
    const { result } = renderHook(() => useToCase(''))
    const { setKebabCase } = result.current[1]
    act(() => setKebabCase('camelCase'))
    expect(result.current[0]).toBe('camel-case')
    act(() => setKebabCase('some text'))
    expect(result.current[0]).toBe('some-text')
    act(() => setKebabCase('some-mixed_string With spaces_underscores-and-hyphens'))
    expect(result.current[0]).toBe('some-mixed-string-with-spaces-underscores-and-hyphens')
    act(() => setKebabCase('AllThe-small Things'))
    expect(result.current[0]).toBe('all-the-small-things')
    act(() => setKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML'))
    expect(result.current[0]).toBe('i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-some-xml-and-html')
  })
  test('should set snake case', () => {
    const { result } = renderHook(() => useToCase(''))
    const { setSnakeCase } = result.current[1]
    act(() => setSnakeCase('camelCase'))
    expect(result.current[0]).toBe('camel_case')
    act(() => setSnakeCase('some text'))
    expect(result.current[0]).toBe('some_text')
    act(() => setSnakeCase('some-mixed_string With spaces_underscores-and-hyphens'))
    expect(result.current[0]).toBe('some_mixed_string_with_spaces_underscores_and_hyphens')
    act(() => setSnakeCase('AllThe-small Things'))
    expect(result.current[0]).toBe('all_the_small_things')
    act(() => setSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML'))
    expect(result.current[0]).toBe('i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html')
  })
  test('should set title case', () => {
    const { result } = renderHook(() => useToCase(''))
    const { setTitleCase } = result.current[1]
    act(() => setTitleCase('some_database_field_name'))
    expect(result.current[0]).toBe('Some Database Field Name')
    act(() => setTitleCase('Some label that needs to be title-cased'))
    expect(result.current[0]).toBe('Some Label That Needs To Be Title Cased')
    act(() => setTitleCase('some-package-name'))
    expect(result.current[0]).toBe('Some Package Name')
    act(() => setTitleCase('some-mixed_string with spaces_underscores-and-hyphens'))
    expect(result.current[0]).toBe('Some Mixed String With Spaces Underscores And Hyphens')
  })
})