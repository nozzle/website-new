import React from 'react'
import styled from 'styled-components'
import Smackdown from 'components/Smackdown'

const Container = styled('div')`
  position: relative;
  margin-top: 3rem;
  background: #e8e8e8;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 3rem;
`

const Heading = styled('div')`
  font-size: 2.5rem;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 1rem;

  @media screen and (max-width: 1000px) {
    padding-top: 1rem;
    font-size: 2rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`

const AuthorBio = styled('div')`
  position: relative;
  padding: 1rem;
  border-radius: 1rem;
  background: #f9f9f9;

  .authorName {
    font-size: 2rem;
    padding-bottom: 1rem;

    @media screen and (max-width: 600px) {
      font-size: 1.5rem;
    }
  }
`

const AuthorPic = styled('img')`
  float: left;
  width: 8rem;
  border-radius: 5rem;
  margin-top: 1rem;
  margin-right: 1rem;
  margin-bottom: 10rem;
`

const BioText = styled('div')`
  padding-top: 1rem;
`

const Contributors = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1.5rem;

  img {
    height: 2.75rem;
    border-radius: 5rem;
  }
`

export default function AuthorsAndContributors({ post }) {
  return (
    <Container>
      {post.fields.contributors?.length ? (
        <Heading>Authors & Contributors</Heading>
      ) : post.fields.author.length > 1 ? (
        <Heading>Authors</Heading>
      ) : (
        <Heading>Author</Heading>
      )}
      <div>
        {post.fields.author.map(author => {
          const {
            fields: { profilePhoto, biography },
          } = author

          const profilePhotoURL = profilePhoto
            ? profilePhoto.fields.file.url
            : ''

          return biography ? (
            <AuthorBio>
              {profilePhotoURL ? (
                <AuthorPic src={profilePhotoURL} alt="Author" />
              ) : null}
              <BioText>
                <div className="authorName">{author.fields.name} </div>
                <Smackdown source={biography} />
              </BioText>
            </AuthorBio>
          ) : null
        })}
      </div>
      {post.fields.contributors?.length ? (
        <Contributors>
          {post.fields.contributors.map(contributor => {
            const {
              fields: { profilePhoto },
            } = contributor

            const profilePhotoURL = profilePhoto
              ? profilePhoto.fields.file.url
              : ''

            return profilePhoto ? (
              <div className="contributor" key={contributor.fields.name}>
                {profilePhotoURL ? (
                  <img src={profilePhotoURL} alt="Contributor" />
                ) : null}
              </div>
            ) : null
          })}
        </Contributors>
      ) : null}
    </Container>
  )
}