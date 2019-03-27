import { describe, it } from "mocha";
import { expect } from "chai";

import { articleMetadataFromOpts } from "../src/article-metadata-from-opts";
import { AppleNews } from "../src/apple-news";

describe("articleMetadataFromOpts()", () => {

    /***
     * Arguments
     */
    const sampleMetadata: AppleNews.IncomingOptions = {
        isPreview: false,
        isIssueOnly: true,
        isCandidateToBeFeatured: true,
        maturityRating: "GENERAL",
        isHidden: false,
        isSponsored: false,
        accessoryText: "Hello, world",
        sections: [
            "https://news-api.apple.com/channels/dummy-uuid/sections/section-uuid",
        ],
    };

    const sampleMetadataNoProps: AppleNews.IncomingOptions = {};

    /***
     * Results Spec
     */
    const sampleMetadataOut: AppleNews.Metadata = {
        isPreview: false,
        isIssueOnly: true,
        isCandidateToBeFeatured: true,
        isHidden: false,
        isSponsored: false,
        accessoryText: "Hello, world",
        links: {
            sections: [
                "https://news-api.apple.com/channels/dummy-uuid/sections/section-uuid",
            ],
        },
        maturityRating: "GENERAL",
    };

    const sampleMetadataDefaults: AppleNews.Metadata = {
        isPreview: true,
        isIssueOnly: false,
        isCandidateToBeFeatured: false,
        isHidden: false,
        isSponsored: false,
    };


    const metadata: AppleNews.Metadata = articleMetadataFromOpts(sampleMetadata);
    const defaultMetadata: AppleNews.Metadata = articleMetadataFromOpts(sampleMetadataNoProps);
    const emptyMetadata: AppleNews.Metadata | object = articleMetadataFromOpts(void 0);

    it("Should match the passed spec in correct format", (done: MochaDone) => {

        expect(metadata).to.be.an("object");
        expect(metadata.isPreview).to.equal(sampleMetadataOut.isPreview);
        expect(metadata.isIssueOnly).to.equal(sampleMetadataOut.isIssueOnly);
        expect(metadata.isCandidateToBeFeatured).to.equal(sampleMetadataOut.isCandidateToBeFeatured);
        expect(metadata.isHidden).to.equal(sampleMetadataOut.isHidden);
        expect(metadata.isSponsored).to.equal(sampleMetadataOut.isSponsored);
        expect(JSON.stringify(metadata.links)).to.equal(JSON.stringify(sampleMetadataOut.links));
        expect(metadata.maturityRating).to.equal(sampleMetadataOut.maturityRating);

        done();
    });

    it("Should provide default options when they're not passed", (done: MochaDone) => {

        expect(defaultMetadata).to.be.an("object");
        expect(defaultMetadata.isPreview).to.equal(sampleMetadataDefaults.isPreview);
        expect(defaultMetadata.isIssueOnly).to.equal(sampleMetadataDefaults.isIssueOnly);
        expect(defaultMetadata.isCandidateToBeFeatured).to.equal(sampleMetadataDefaults.isCandidateToBeFeatured);
        expect(defaultMetadata.isHidden).to.equal(sampleMetadataDefaults.isHidden);
        expect(defaultMetadata.isSponsored).to.equal(sampleMetadataDefaults.isSponsored);

        done();
    });

    it("Should return an empty object of passed no parameters", (done: MochaDone) => {

        expect(emptyMetadata).to.be.an("object");
        expect(JSON.stringify(emptyMetadata)).to.equal(JSON.stringify({}));

        done();
    });
});
