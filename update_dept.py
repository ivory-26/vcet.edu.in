import os

dir_path = r'c:\edu_vcet\vcet.edu.in\pages\departments'
files = [f for f in os.listdir(dir_path) if f.startswith('Dept') and f.endswith('.tsx') and f != 'DeptIT.tsx']

for f in files:
    file_path = os.path.join(dir_path, f)
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    if 'import { newsletterApi }' not in content:
        content = content.replace(
            "import type { Department } from '../../admin/types';",
            "import type { Department } from '../../admin/types';\nimport { newsletterApi } from '../../admin/api/newsletterApi';"
        )

    if 'setDynamicApiItems' not in content:
        content = content.replace(
            "const [department, setDepartment] = useState<Department | null>(null);",
            "const [department, setDepartment] = useState<Department | null>(null);\n  const [dynamicApiItems, setDynamicApiItems] = useState<any[]>([]);"
        )

    import re

    # Replace useEffect logic
    content = re.sub(
        r'if \(res\.success\) setDepartment\(res\.data\);',
        'if (res.success) {\n          setDepartment(res.data);\n          newsletterApi.list(res.data.id).then(n => setDynamicApiItems(n.data)).catch(console.error);\n        }',
        content
    )

    # Replace newsletters array mapping
    content = re.sub(
        r"const newsletters = Array\.isArray\(sectionData\?\.newsletters\)\s*\n\s*\? sectionData\.newsletters\.filter\(\(item: any\) => String\(item\?\.label \|\| ''\)\.trim\(\) && item\?\.pdf\)\s*\n\s*: \[\];",
        "const newsletters = dynamicApiItems\n    .filter(item => item.type === 'newsletter' && item.pdf)\n    .map(item => ({ label: item.title, pdf: item.pdf }));",
        content
    )

    # Replace magazines array mapping
    content = re.sub(
        r"const magazines = Array\.isArray\(sectionData\?\.magazines\)\s*\n\s*\? sectionData\.magazines\.filter\(\(item: any\) => String\(item\?\.label \|\| ''\)\.trim\(\) && item\?\.pdf\)\s*\n\s*: \[\];",
        "const magazines = dynamicApiItems\n    .filter(item => item.type === 'magazine' && item.pdf)\n    .map(item => ({ label: item.title, pdf: item.pdf }));",
        content
    )

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f'Updated {f}')
