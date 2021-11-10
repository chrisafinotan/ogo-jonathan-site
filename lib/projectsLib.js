import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const projectsDirectory = path.join(process.cwd(), 'projects')

//-----------------------METHOD TO FETCH FROM API E.G. https://api.nasa.gov/
// export async function getSortedPostsData() {
//     // Instead of the file system,
//     // fetch post data from an external API endpoint
//     const res = await fetch('..')
//     return res.json()
// }

//-----------------------METHOD TO FETCH FROM DATABASE E.G. MONGODB
// import someDatabaseSDK from 'someDatabaseSDK'

// const databaseClient = someDatabaseSDK.createClient(...)

// export async function getSortedPostsData() {
//     // Instead of the file system,
//     // fetch post data from a database
//     return databaseClient.query('SELECT posts...')
// }

//----------------------METHOD TO FETCH FROM FILESYSTEM
export function getSortedProjectsData() {
    // Get file names under /projects
    console.log("hello")
    const fileNames = fs.readdirSync(projectsDirectory)
    const allProjectsData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(projectsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)
        // Combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })
    // Sort posts by date
    return allProjectsData.sort(({ id: a }, { id: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    }).reverse()
}

export function getAllProjectIds() {
    const fileNames = fs.readdirSync(projectsDirectory)
    console.log("filenames", fileNames)
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getProjectData(id) {
    const fullPath = path.join(projectsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    // const processedContent = await remark()
    //     .use(html)
    //     .process(matterResult.content)
    // const contentHtml = processedContent.toString()

    // Combine the data with the id and contentHtml
    return {
        id,
        // contentHtml,
        ...matterResult.data
    }
}