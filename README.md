---
summary: Create a modern eCommerce platform focused on fast and intuitive product search and filtering. Customers should experience results in under 250ms. As they type, the system should suggest queries in real time. Additionally, the platform should feature a chatbot that can answer product-related questions using natural language.
contact: sc.raul.17@gmail.com
---

# Modern eCommerce Website

## Information Gathering

**Client 1**: Hello, we would like to redesign our eCommerce website to feel more modern and provide our customers with a better shopping experience.

**Product Manager 1**: Hi, thanks for reaching out. Could you give me more information about your current website—specifically, what types of products you sell and any pain points you've noticed?

**Client 2**: Sure. We specialize in servo motors, stepper motors, drivers, and related accessories. Our website looks outdated, and a common complaint we hear is that the search and filtering experience isn’t intuitive. For example, the search bar doesn’t offer suggested terms, and filtering is very limited. A lot of customers have also asked for a chatbot or some way to get technical questions answered.

**Product Manager 2**: Got it. So your catalog includes various motors and mechatronics components. When you mention the filtering is ineffective, could you elaborate? What kind of filters would be useful for your customers?

**Client 3**: Customers should be able to filter by category, voltage, torque, shaft size, current rating, and other technical specs. Right now, we only offer basic filtering by category and some keyword matches in the search bar—it’s just not granular enough.

**Product Manager 3**: Understood. This sounds like a strong use case for a faceted search system. Are your products already tagged with these technical attributes in your catalog or database?

**Client 4**: Some are, but not consistently. We’ll probably need to clean up and standardize the data.

**Product Manager 4**: That’s totally okay—we can help you build tools and workflows to clean and standardize the data over time. Regarding the AI assistant you mentioned, are you imagining a chatbot that only answers technical questions, or more of a guided shopping assistant?

**Client 5**: Ideally both. We’d like it to answer technical questions like “What’s the torque on this motor?” but also help users find the right product based on their needs. For example, “I need a motor that works with 12V and fits inside a 5x5cm enclosure.”

**Product Manager 5**: That makes sense. We can train the AI on your product catalog and documentation, and use a natural language interface to make it easy for users to interact with it. Would you prefer the assistant to be a chat widget or more of a prominent feature like a “Find My Motor” wizard?

**Client 6**: A chat widget is a must, but we also like the idea of a separate guided tool—maybe under a “Product Finder” section.

**Product Manager 6**: Excellent. From a technical perspective, we’ll want to make sure product data is structured in a way the AI can query effectively. We’ll likely propose a layered architecture—search and filtering handled via an API and Elasticsearch for speed, with the AI layered on top using natural language processing tools like OpenAI.

**Client 7**: Sounds good. What would the timeline for a project like this look like?

**Product Manager 7**: We can break it down into the following phases:

- **Phase 1 (3–5 weeks)**: UX/UI redesign and implementation of improved filtering system  
- **Phase 2 (3–4 weeks)**: Backend improvements for structured product data and search indexing  
- **Phase 3 (6–8 weeks)**: AI assistant development and integration  
- **Phase 4 (2–3 weeks)**: Testing, QA, and deployment

**Client 8**: Great, we are exited to get this going!.

## System Requirements and  architectural Drivers

**Functional Features**:

- Users should be have a filtering options based on the common technical attributes of the current products.  
  - ex if viewing motors some filtering options may include torque, size and categroy
- system needs to provide real-time search suggestions as user types in search bar
- chatbot should be able to answer technical questions about product catalog as well as make products recommendations

**Quality Attributes**:

- system most return search results in less than 250 ms
- chat bot should be able to respond under 5 seconds
- website UI should be responsive across desktop, tablet and mobile use cases

**System Contraints**:

- the system will use Elastic Search stack for a fast and scalable search engine
- given our sole engineers familiarity with next js, web client will be built using next js
- Go for the backend, due to its backend ecosystem.
- For this project the budget the cost of services shall not exceed $500/month to operate.
