import { lintSource } from "@secretlint/core";
// @ts-expect-error: no types
import { creator } from "@secretlint/secretlint-rule-preset-canary";
import { Diagnostic, linter } from "@codemirror/lint";
console.log(creator);

// CodeMirror Linter implementation
export const secretlint = linter(async (view) => {
    const results = await lintContent({
        content: view.state.doc.toString(),
        url: "example.txt"
    });
    const diagnostics: Diagnostic[] = results.messages.map((message) => {
        return {
            from: message.range[0],
            to: message.range[1],
            message: message.message,
            severity: message.severity,
            actions: [
                {
                    name: "Documentation",
                    apply: () => {
                        window.open(message.docsUrl, "_blank");
                    }
                }
            ]
        };
    });
    return diagnostics;
});
export const lintContent = ({ content, url }: { content: string; url: string }) => {
    const rules = [
        {
            id: "@secretlint/secretlint-rule-preset-canary",
            rule: creator
        }
    ];
    return lintSource({
        source: {
            contentType: "text",
            content,
            filePath: url,
            ext: url.split(".").pop() ?? ""
        },
        options: {
            config: {
                rules: rules
            }
        }
    });
};
