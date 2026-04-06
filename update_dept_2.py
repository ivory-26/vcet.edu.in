import os
import re

dir_path = r'c:\edu_vcet\vcet.edu.in\pages\departments'
files = ['DeptMech.tsx', 'DeptFE.tsx', 'DeptENTC.tsx', 'DeptCSDS.tsx', 'DeptComputerEngg.tsx', 'DeptCivil.tsx', 'DeptAIDS.tsx']

for f in files:
    file_path = os.path.join(dir_path, f)
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # If it wasn't partially updated by the previous script:
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
        content = re.sub(
            r'if \(res\.success\) setDepartment\(res\.data\);',
            'if (res.success) {\n          setDepartment(res.data);\n          newsletterApi.list(res.data.id).then(n => setDynamicApiItems(n.data)).catch(console.error);\n        }',
            content
        )

    # Now define the `newsletters` and `magazines` variable if it doesn't exist
    if 'const newsletters = dynamicApiItems' not in content:
        # We can add it right after useEffect
        insert_text = "\n\n  const newsletters = dynamicApiItems\n    .filter(item => item.type === 'newsletter' && item.pdf)\n    .map(item => ({ label: item.title, href: item.pdf }));\n  const magazines = dynamicApiItems\n    .filter(item => item.type === 'magazine' && item.pdf)\n    .map(item => ({ label: item.title, href: item.pdf }));"
        
        content = re.sub(
            r'(\.catch\(\(\) => setDepartment\(null\)\);\n  \}, \[\];)',
            r'\1' + insert_text,
            content
        )

    # Update DepartmentNewsletterPanel props
    content = content.replace('newsletterItems={newsletterPdfs}', 'newsletterItems={newsletters.length > 0 ? newsletters : newsletterPdfs}')
    content = content.replace('magazineItems={magazinePdfs}', 'magazineItems={magazines.length > 0 ? magazines : magazinePdfs}')

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f'Updated {f}')
