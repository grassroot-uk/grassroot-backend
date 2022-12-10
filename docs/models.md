# Grassroot Profiles Models


## Entities
+ DAO
+ Individual

## Relationships
+ DAO Belongs to an Individual (Admin)
+ DAO Can refer to many UserId


## DAO Model
+ Name ||IMP||
+ Description ||IMP||
+ Admin Address ||IMP||
+ Admin UserId -> Ref ||IMP||
+ Profile Picture ||IMP||
+ Background Picture
+ Resources: Files[]
+ Category ||IMP||
+ SubCategory ||IMP||
+ Metadata
+ Participants: Users[]
+ Files: File[]
+ Tags
+ Active Campaigns: Campaigns[]
+ Socials: Social[]

## Individual Model
+ First Name
+ Last Name
+ About
+ Address
+ AdminOf: DAOIds[]
+ ParticipantOf: DAOIds[]
+ Email
+ Socials: Social[]
+ Files: File[]

## Social Model
+ Name: String
+ Icon: String
+ Url: String
+ Other: JSON

## File Model
+ Name: String
+ OwnerId: String
+ MetadataUrl?: String
+ MetadataCid?: String
+ ImageUrl?: String
+ ImageCid?: String
+ metadata: JSON
+ Resolver: String
+ UploadedIPFS: boolean -> default true