import os
import re

dir_path = r'c:\edu_vcet\vcet.edu.in\pages\departments'
files_to_slugs = {
    'DeptMech.tsx': 'mechanical-engineering',
    'DeptCivil.tsx': 'civil-engineering',
    'DeptComputerEngg.tsx': 'computer-engineering',
    'DeptCSDS.tsx': 'computer-science-and-engineering-data-science',
    'DeptENTC.tsx': 'electronics-and-telecommunication-engineering',
    'DeptFE.tsx': 'first-year-engineering',
    'DeptAIDS.tsx': 'artificial-intelligence-and-data-science'
}

for f, slug in files_to_slugs.items():
    file_path = os.path.join(dir_path, f)
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # 1. Imports
    if 'import { departmentApi }' not in content:
        content = content.replace(
            "import DepartmentFacultySection from '../../components/DepartmentFacultySection';",
            "import DepartmentFacultySection from '../../components/DepartmentFacultySection';\nimport { departmentApi } from '../../admin/api/departments';\nimport type { Department } from '../../admin/types';\nimport { newsletterApi } from '../../admin/api/newsletterApi';"
        )

    # 2. Add state and effect logic right after useState('about')
    # Let's completely replace any previous corrupted attempts
    
    # Let's find: `const [activeId, setActiveId] = useState('about');`
    # and maybe `const activeLink = sidebarLinks.find(l => l.id === activeId);`

    if 'useEffect(() => {\n    departmentApi.getBySlug' not in content:
        # Check where to insert
        hook_code = f"""
  const [department, setDepartment] = useState<Department | null>(null);
  const [dynamicApiItems, setDynamicApiItems] = useState<any[]>([]);

  useEffect(() => {{
    departmentApi.getBySlug('{slug}')
      .then((res) => {{
        if (res.success) {{
          setDepartment(res.data);
          newsletterApi.list(res.data.id).then(n => setDynamicApiItems(n.data)).catch(console.error);
        }}
      }})
      .catch(() => setDepartment(null));
  }}, []);

  const newsletters = dynamicApiItems
    .filter(item => item.type === 'newsletter' && item.pdf)
    .map(item => ({{ label: item.title, href: item.pdf }}));
  const magazines = dynamicApiItems
    .filter(item => item.type === 'magazine' && item.pdf)
    .map(item => ({{ label: item.title, href: item.pdf }}));
"""
        
        # Replace the first `const [activeId, setActiveId] = useState('about');` line
        if 'const activeLink = sidebarLinks.find(l => l.id === activeId);' in content:
            content = content.replace(
                "const activeLink = sidebarLinks.find(l => l.id === activeId);",
                "const activeLink = sidebarLinks.find(l => l.id === activeId);" + hook_code
            )
        else:
            content = content.replace(
                "const [activeId, setActiveId] = useState('about');",
                "const [activeId, setActiveId] = useState('about');" + hook_code
            )

    # 3. Fix the array assignments if there were issues
    content = re.sub(
        r'newsletterItems=\{.*?\}',
        'newsletterItems={newsletters.length > 0 ? newsletters : newsletterPdfs}',
        content
    )
    content = re.sub(
        r'magazineItems=\{.*?\}',
        'magazineItems={magazines.length > 0 ? magazines : magazinePdfs}',
        content
    )

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f'Updated {f}')
